import React, { useState } from 'react'
import style from './Login.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Login() {

  const [show, setShow] = useState(false);

  function showLogin() {
    setShow(true);
  }

  function hidelogin() {
    setShow(false);
  }

  async function getOfficialData() {
  const id = 20220073//document.getElementById('userid')?.value?.trim();
  const token = document.getElementById('token')?.value?.trim();

  // if (!id || !token) {
  //   toast.error("Missing ID or token");
  //   return;
  // }

  try {
    const response = await axios.get(`http://newecom.fci-cu.edu.eg/api/student-courses?size=150&studentId.equals=${id}&includeWithdraw.equals=true`);
          ///////////////////////////////////////////////////////////////////////////////// DOES NOT WORK F**K ME seems CORS is gonna be a problem
          // headers: {
      //   'Authorization': token,
      //   'Accept': 'application/json'
      // }

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Server error: ${response.status}\n${errText}`);
    }

    const data = await response.json();
    console.log("Server response:", data);

    // TODO: Handle the data — display in UI, store in state, etc.
  } catch (err) {
    console.error("Fetch failed:", err);
    toast.error("Could not get data: " + err.message);
  } finally {
    hidelogin();
  }
}


  return <>

    <div className='m-10 flex flex-row justify-center items-center dark:text-white'>
      <button className='bg-blue-500 p-4 rounded-3xl cursor-pointer' onClick={showLogin}>AutoFill From Account</button>
    </div>

    {show ?
      <div className="fixed left-0 top-0 bottom-0 right-0 bg-[#000000bd] flex items-center justify-center z-10 text-white">
        <div className='w-1/2 h-1/2 bg-white dark:bg-blue-950 p-4 rounded-3xl flex flex-col justify-center space-y-8 relative' id='login'>
          <FontAwesomeIcon icon={faArrowLeft} className='text-white bg-red-500 p-4 absolute right-2 top-2 w-4 h-4 rounded-full cursor-pointer' onClick={hidelogin} />
          <h4 className='text-center text-xl font-bold'>Login into your Account</h4>
          <div className='flex justify-center items-center space-x-2 text-2xl'>
            <h4>Username:</h4>
            <input type="text" name="userid" id="userid" className='text-black bg-white rounded-3xl p-2' />
          </div>
          <div className='flex justify-center items-center space-x-2 text-2xl'>
            <h4>Password:</h4>
            <input type="text" name="token" id="token" className='text-black bg-white rounded-3xl p-2' />
          </div>
          <button className='text-xl bg-blue-500 p-4 rounded-full cursor-pointer' onClick={getOfficialData}>Get Data!</button>
        </div>
      </div>

      : <></>}

  </>
}
