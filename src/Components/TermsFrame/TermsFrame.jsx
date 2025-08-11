import React, { useEffect, useState } from 'react';
import style from './TermsFrame.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Term from '../Term/Term';

export default function TermsFrame({ useNewBylaw, saved, oldGPA }) {
  const [terms, setTerms] = useState(1);
  const [finalGPA, setFinalGPA] = useState(NaN);
  const [finalTotalHours, setFinalTotalHours] = useState(0);
  const [useOldGPA, setUseOldGPA] = useState(false);

  function increaseTerms() {
    setTerms(terms + 1);
    toast.success(`Increased the term count to ${terms + 1}`);
  }

  function decreaseTerms() {
    if (terms === 1) {
      toast.error("Can not remove the last term");
      setTerms(1);
      return;
    }
    setTerms(terms - 1);
    toast.success(`Decreased the term count to ${terms - 1}`);
  }

  function gpaToResult() {
    switch (true) {
      case (finalGPA >= 3.5):
        return "Excellent";
      case (finalGPA >= 3.0):
        return "Very Good";
      case (finalGPA >= 2.5):
        return "Good";
      case (finalGPA >= 2.0):
        return "Acceptable";
      case (finalGPA >= 1):
        return "Weak";
      default:
        return "Very Weak";
    }
  }

  function getGPA() {
    try {
      let finalSave = {
        'useNewBylaw': useNewBylaw,
        'terms': [],
      };
      let tempSave = [];
      let totalhours = 0;
      let totalGPA = 0;
      let warned = false;

      try {
        if (useOldGPA) {
          const oldGPAElement = document.getElementById('oldGPA');
          const oldHoursElement = document.getElementById('oldHours');
          totalhours = Number(oldHoursElement.value);
          totalGPA = Number(oldGPAElement.value) * totalhours;
        }
      }
      catch {
        totalhours = 0;
        totalGPA = 0;
      }

      const termsElements = document.querySelectorAll('.term');

      for (let term of termsElements) {
        let subtemp = [];
        let forms = term.querySelectorAll('form');
        for (let form of forms) {
          let courseName = form.name.value;
          let courseHour = Number(form.hour.value);
          let courseGPA = Number(form.value.value);

          subtemp.push({
            name: courseName,
            hour: courseHour,
            gpa: courseGPA,
          });

          if (courseGPA === -1 && !warned) {
            warned = true;
            toast('⚠️ Some courses do not have results');
            continue;
          }
          else if (courseGPA === 0) {
            toast('⚠️ Failed Courses hours skipped');
            continue;
          }

          totalhours += courseHour;
          totalGPA += courseGPA * courseHour;
        }
        tempSave.push(subtemp);
      }

      if (totalhours === 0) throw new Error('Zero hours');
      finalSave['terms'] = tempSave;

      if (useOldGPA) {
        const oldGPAElement = document.getElementById('oldGPA');
        const oldHoursElement = document.getElementById('oldHours');

        let temp = {
          'used': true,
          'hours': Number(oldHoursElement.value),
          'gpa': Number(oldGPAElement.value),
        }
        finalSave['oldGPA'] = temp;
      }
      else {
        finalSave['oldGPA'] = {
          'used': 'false',
        }
      }

      localStorage.setItem('savedCourses', JSON.stringify(finalSave));
      setFinalGPA(Number(totalGPA / totalhours).toFixed(2));
      setFinalTotalHours(totalhours);
      toast.success('GPA calculated successfully');
    } catch (e) {
      toast.error('Could not calculate GPA');
    }
  }

  function openOldGPA() {
    if (!useOldGPA) {
      setUseOldGPA(true);
    }
  }

  function closeOldGPA() {
    setUseOldGPA(false);
  }

  useEffect(() => {
    if (Array.isArray(saved) && saved.length > 0) {
      setTerms(saved.length);
    } else {
      setTerms(1);
    }
  }, [saved]);

  useEffect(() => {

    if (oldGPA?.used) {
      setUseOldGPA(true);
    }

  },[oldGPA]);

  return (
    <>
      <div className={`flex justify-evenly items-center space-x-2 md:text-2xl lg:text-3xl bg-blue-500 rounded-full p-4 ${useOldGPA ? "w-11/12 md:w-2/3" : "w-1/4"} mx-auto my-10 dark:text-white`}>
        {useOldGPA ? <>
          <h4>Use Previous GPA</h4>
          <input type="number" name="oldGPA" id="oldGPA" min={0} max={4} step={0.01} className='bg-white text-black rounded-full p-2 w-1/6' defaultValue={oldGPA?.gpa} />
          <h4>in</h4>
          <input type="number" name="oldHours" id="oldHours" min={0} max={216} step={1} className='bg-white text-black rounded-full p-2 w-1/6' defaultValue={oldGPA?.hours} />
          <h4>Hours</h4>
          <button className='bg-blue-950 rounded-full w-16 h-16' onClick={closeOldGPA}>X</button>
        </> : <><button className='cursor-pointer w-full h-full rounded-full' onClick={openOldGPA}>Use Previous GPA ?</button></>}
      </div>
      <div className="flex justify-center items-center space-x-2 md:text-2xl lg:text-3xl my-10 dark:text-white">
        <button onClick={decreaseTerms}>
          <FontAwesomeIcon icon={faMinusCircle} />
        </button>
        <h3>Number of Terms: {terms}</h3>
        <button onClick={increaseTerms}>
          <FontAwesomeIcon icon={faPlusCircle} />
        </button>
      </div>

      <div className='lg:w-3/4 mx-auto grid grid-cols-1 md:grid-cols-2 w-full space-x-2 space-y-4 p-2 my-10' id='terms'>
        {[...Array(terms)].map((_, index) => (
          <Term key={index} index={index} useNewBylaw={useNewBylaw} saved={(saved?.length > 0) ? saved[index] : []} />
        ))}
      </div>

      {!isNaN(finalGPA) && (
        <div className='mx-auto text-3xl m-4 text-center dark:text-white flex flex-col space-y-4'>
          <h4>Your Final GPA is <span className='font-bold'>{finalGPA}</span></h4>
          <h4>Total hours are <span className='font-bold'>{finalTotalHours}</span></h4>
          <h4>Final Result: <span className='font-bold'>{gpaToResult()}</span></h4>
        </div>
      )}

      <button className='block mx-auto text-white bg-blue-500 p-2 w-full md:w-3/4 lg:w-1/2 rounded-3xl text-3xl' onClick={getGPA}>
        Get GPA
      </button>

      <div className="my-4 flex justify-evenly items-center dark:text-white font-bold md:text-lg lg:text-2xl w-full">
        <p>Copyright 2025</p>
        <p>Made by MythicalPlayz</p>
      </div>
    </>
  );
}
