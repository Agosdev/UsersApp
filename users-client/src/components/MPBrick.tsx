import { Wallet } from '@mercadopago/sdk-react';
import { initMercadoPago } from '@mercadopago/sdk-react'
import axios from 'axios';
import { useId, useState } from 'react';
import { API, MP_PUBLIC_KEY } from '../constants/api.constants';
import CourseImage from '../assets/course-image.jpeg'

const MPBrick = () => {
  const [preferenceId, setPreferenceId] = useState<string>('')
  const randomID = useId()
  initMercadoPago(MP_PUBLIC_KEY);

    const createPreference = async () => {
      try {
        const response = await axios.post(`${API}/payments/create_preference`, {
          id: randomID,
          title: 'FullStack Course',
          description: 'Make a React + Nest project + MongoDB',
          quantity: 1,
          unit_price: 10,
          currency_id: 'ARS',
        });
        console.log(response)
        const id = response.data;
        return id;
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleBuy = async () => {
      const id = await createPreference();
      console.log(id)
      if (id) {
        setPreferenceId(id);
      }
    };

    return (
      <div className="bg-gray-950 p-4">
        <h3 className="font-bold text-center block my-2">FullStack Course</h3>
        <h5 className="text-center block my-2">Make a React + Nest project + MongoDB project!</h5>
        <img src={CourseImage} alt="course-image" />
        <h5 className="text-center block my-2">$10</h5>
      <button className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2" onClick={handleBuy}>Buy FullStack Course</button>
      {preferenceId !== '' && <Wallet initialization={{ preferenceId }} />}
      </div>
    )
}

export default MPBrick;