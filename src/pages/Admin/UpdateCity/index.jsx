import { useAtomValue } from 'jotai';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAtom } from 'stores/user';

const UpdateCity = () => {

  const navigate = useNavigate();
  const admin = useAtomValue(adminAtom);


  useEffect(
    () => {
      if(admin === "false"){
        navigate('/')
      }
    }, []
  )
  return (
    <div>
      <h1>Update</h1>
    </div>
  );
};

export default UpdateCity;