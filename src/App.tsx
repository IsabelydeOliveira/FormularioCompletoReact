import { useState } from 'react';
import './styles/global.css';

import {useForm, useFieldArray} from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { createUserFormData } from './shemas/shemaFormulario';
 
type createUserFormData = z.infer<typeof createUserFormData>

export function App() {
  const [output, setOuput] = useState('')
  const {register, handleSubmit, control, formState:{errors}} = useForm<createUserFormData>({
      resolver:zodResolver(createUserFormData),
  })

  const {fields, append, remove} = useFieldArray ({
   control,
   name: 'tech', 
  })

 function addNewClick(){
  append({title: '', knowledge: 0})
 }

  function createUser(data: createUserFormData){
    setOuput(JSON.stringify(data, null, 2))
  } 

  return (
   <main className='h-dvh bg-zinc-900 text-zinc-300 flex flex-col gap-10 items-center justify-center'>
    <form onSubmit={handleSubmit(createUser)} className='flex flex-col gap-4 w-full max-w-sm'>
    <div className='flex flex-col gap-1'>
        <label htmlFor='name'>Nome</label>     
        <input 
        type='text'
        className='border border-zinc-600 shadow-sm rounded h-10 px-3 bg-zinc-900 text-white'
        {...register('name')}
        />
        {errors.name && <span className='text-red-500'>{errors.name.message}</span>}
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor='email'>E-mail</label>     
        <input 
        type='email'
        className='border border-zinc-600 shadow-sm rounded h-10 px-3 bg-zinc-900 text-white'
        {...register('email')}
        />
        {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
      </div>
      <div className='flex flex-col gap- 1'>
        <label htmlFor='password'>Password</label>
       <input
        type='password'
        className='border border-zinc-600 shadow-sm rounded h-10 px-3 bg-zinc-900 text-white'
        {...register('password')}
        />
         {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
      </div>

      <div className='flex flex-col gap- 1'>
        <label htmlFor='password' className='flex items-center justify-between '>
          Tecnnologias
        <button onClick={addNewClick}
        className='text-emerald-500 text-sm'
        >Adicionar</button>
        </label>
      
      
    {fields.map((field, index) => {
      return(
        <div className='flex gap-2' key={field.id}>
          <div className='flex-1 flex-col gap- 1'>
        <input
        type='text'
        className=' border *:border-zinc-600 shadow-sm rounded h-10 px-2 bg-zinc-900 text-white'
        {...register(`tech.${index}.title`)}
        />   
        {errors.tech?.[index]?.title && <span className='text-red-500'>{errors.tech?.[index]?.title?.message}</span>}
         </div>
         <div className='flex flex-col gap- 1'> 
        <input
        type='number'
        className=' w-16 flex-1 border border-zinc-600 shadow-sm rounded h-10 px-2 bg-zinc-900 text-white'
        {...register(`tech.${index}.knowledge`)}
        />
          {errors.tech?.[index]?.knowledge && <span className='text-red-500'>{errors.tech?.[index]?.knowledge?.message}</span>}
        </div>
        </div>        
      )
    })}
         {errors.tech && <span className='text-red-500'>{errors.tech.message}</span >}
       </div>

    <button 
    type='submit'
    className='bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600'
    >
      Salvar
    </button>
    </form>
    <pre>{output}</pre>
   </main>

  )
}


