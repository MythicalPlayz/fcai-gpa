import React, { useEffect, useState } from 'react'
import style from './Term.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

export default function Term({ index, useNewBylaw, saved }) {

  const [courses, setCourses] = useState(1);
  function increaseCourses() {
    setCourses(courses + 1);
    toast.success(`Increased the course count to ${courses + 1}`);
  }

  function decreaseCourses() {
    if (courses == 1) {
      toast.error("Can not remove the last course");
      setCourses(1);
      return;
    }
    setCourses(courses - 1);
    toast.success(`Decreased the course count to ${courses - 1}`);
  }

  useEffect(() => {
    setCourses(saved?.length);
    return () => {

    }
  }, [saved])

  useEffect(() => {
    const container = document.querySelector(`#T${index}`);
    if (!container) return;

    const forms = container.querySelectorAll('form');

    for (let i = 0; i < forms?.length && i < saved?.length; i++) {
      const form = forms[i];
      form.name.value = saved[i].name;
      form.hour.value = saved[i].hour;
      form.value.value = String(saved[i].gpa);
    }
  }, [courses])




  return <>

    <div className="flex flex-col justify-center items-center p-4 bg-blue-500 rounded-3xl text-white h-fit term" id={`T${index}`}>
      <h4 className='font-bold'>Term {index + 1}</h4>
      <div className="flex justify-center items-center space-x-2 md:text-2xl lg:text-3xl my-10">
        <button onClick={decreaseCourses}><FontAwesomeIcon icon={faMinusCircle} /></button>
        <h3>Number of Courses: {courses}</h3>
        <button onClick={increaseCourses}><FontAwesomeIcon icon={faPlusCircle} /></button>
      </div>
      <div className='flex flex-col justify-center items-center w-full'>
        <div className='flex justify-evenly items-center w-full my-2'>
          <p className='w-1/3 text-center'>Course</p>
          <p className='w-1/3 text-center'>Hour</p>
          <p className='w-1/3 text-center'>Grade</p>
        </div>
        {[...Array(courses)].map((_, course) => (
          <form key={course} className='flex flex-row my-2 justify-evenly items-center w-full space-x-2' action={""}>
            <input type="text" name={`name`} className='bg-white rounded-3xl text-black p-2 w-1/3' defaultValue={""} />
            <input type="number" name={`hour`} className='bg-white rounded-3xl text-black p-2 w-1/3' defaultValue={0} min={0} step={1} />
            <select name={`value`} className='bg-white rounded-3xl text-black p-2 w-1/3 h-full'>
              <option value="-1"></option>
              {useNewBylaw ?
                <>
                  <option value="4">A+</option>
                  <option value="3.7">A</option>
                  <option value="3.4">A-</option>
                  <option value="3.2">B+</option>
                  <option value="3">B</option>
                  <option value="2.8">B-</option>
                  <option value="2.6">C+</option>
                  <option value="2.4">C</option>
                  <option value="2.2">C-</option>
                  <option value="2">D+</option>
                  <option value="1.5">D</option>
                  <option value="1">D-</option>
                  <option value="0">F</option>
                </>
                :
                <>
                  <option value="4">A+</option>
                  <option value="3.7">A</option>
                  <option value="3.3">B+</option>
                  <option value="3">B</option>
                  <option value="2.7">C+</option>
                  <option value="2.4">C</option>
                  <option value="2.2">D+</option>
                  <option value="2.0">D</option>
                  <option value="0">F</option>
                </>
              }
            </select>

          </form>
        ))}
      </div>
    </div>

  </>
}
