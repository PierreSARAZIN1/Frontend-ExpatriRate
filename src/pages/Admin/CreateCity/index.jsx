import React, { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { adminAtom } from 'stores/user';
import { useNavigate } from 'react-router-dom';


const CreateCity = () => {

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
      <h1>Create</h1>
    </div>
  );
};

export default CreateCity;