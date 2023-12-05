import { useUsers } from "../context/useUsers";
import { Role } from "../enum/user";
import {FormikErrors, useFormik } from "formik";
import { nameRegex, passwordRegex } from "../regex/useFormRegex";
import { IFormikData } from "../interface/userForm.interface";
import { User } from "../interface/user.interface";

function UserForm() {
  
  const user: User = {
      _id: "",
      name: "",
      email: "",
      password: "",
      role: Role.STUDENT,
    }

  const { createUser } = useUsers();

  const handleSubmit = async (dataValues: User) => {
    const data = {
      name: dataValues.name.toLowerCase().trim(),
      email: dataValues.email.toLowerCase().trim(),
      password: dataValues.password,
      role: dataValues.role,
    };

    await createUser(data);

    resetForm()
  };

  const validateForm = (valuesToValidate: IFormikData) => {
    const error: FormikErrors<IFormikData> = {};

    //name validation
    if (valuesToValidate.name === '') {
      error.name = 'Username is required';
    }
    if (!nameRegex.test(valuesToValidate.name)) {
      error.name = 'Username can´t have numbers';
    }

    //password validation
    if (valuesToValidate.password === '') {
      error.password = 'Password is required';
    }
    
    if (!passwordRegex.test(valuesToValidate.password)) {
      error.password = 'Password must combine numbers, lettersa and special symbols in a range from 8 to 15 characters';
    }

    //email validation
    if (valuesToValidate.email === '') {
      error.email = 'Email is required';
    }

  }

  const formik = useFormik({
    initialValues: user,
    validate: validateForm,
    onSubmit: handleSubmit,
  });

  const { errors, values, setFieldValue, handleChange, resetForm} = formik;

  const formCompleted = values.name !== '' && values.email  !== '' && values.password  !== ''

  return (
      <form autoComplete="off" onSubmit={formik.handleSubmit}>

            <input
              name="name"
              value={values.name}
              type="text"
              placeholder="Username"
              onChange={handleChange}
              className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
              minLength={3}
              maxLength={30}
            />
            {errors.name && <span className=" bg-red-700">{errors.name}</span>}

            <input
              name="email"
              value={values.email}
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
            />
            {errors.email && <span className=" bg-red-700">{errors.email}</span>}

            <input 
              name="password" 
              value={values.password}
              type="password" 
              placeholder="Password" 
              onChange={handleChange}
              className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
            />
            {errors.password && <span className=" bg-red-700">{errors.password}</span>}
            
              <select 
              className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
                  value={values.role}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setFieldValue('role', e.target.value);
                  }}
                  
                  >
                  <option value={Role.STUDENT}>STUDENT</option>
                  <option value={Role.ADMIN}>ADMIN</option>
                </select>

            <button disabled={!formCompleted}  className={formCompleted  ? 'bg-green-500 px-3 block py-2 w-full'  : 'bg-gray-500 px-3 block py-2 w-full' }>
              Save
            </button>
      </form>
  );
}

export default UserForm;