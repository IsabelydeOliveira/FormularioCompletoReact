import { useState } from 'react';
import './styles/global.css';

import {useForm, useFieldArray} from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'

const createUserFormShema = z.object({
  name: z.string().min(1,{message: 'Campo nome é obrigatório!'})
  .transform(name => {
    return name.trim().split(' ').map(word=>{
      return word[0].toLocaleUpperCase().concat(word.substring(1))
    }).join(' ')
  }),
  email: z.string()
  .min(1, { message: 'E-mail é obrigatório!' }).email('formato de e-mail invalida!'),
  
  password: z.string()
  .min(6, {message:'Senha precisa ter no mínimo 6 caracteres'}),

  tech: z.array(z.object({
    title: z.string().min(1,{message: 'O título é abrigatório!'}) ,
    knowledge: z.number().min(1).max(100),
  }))

})
 
type createUserFormData = z.infer<typeof createUserFormShema>

export function App() {
  const [output, setOuput] = useState('')
  const {register, handleSubmit, control, formState:{errors}} = useForm<createUserFormData>({
      resolver:zodResolver(createUserFormShema),
  })

  const {fields, append, remove} = useFieldArray ({
   control,
   name: 'tech', 
  })

 function addNewClick(){
  append({title: '', knowledge: 0})
 }

  Function

  function createUser(data: any){
    setOuput(JSON.stringify(data, null, 2))
  } 

  return (
   <main className='h-screen bg-zinc-950 text-zinc-300 flex flex-col gap-10 items-center justify-center'>
    <form onSubmit={handleSubmit(createUser)} className='flex flex-col gap-4 w-full max-w-sm'>
    <div className='flex flex-col gap-1'>
        <label htmlFor='name'>Nome</label>     
        <input 
        type='text'
        className='border border-zinc-600 shadow-sm rounded h-10 px-3 bg-zinc-900 text-white'
        {...register('name')}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor='email'>E-mail</label>     
        <input 
        type='email'
        className='border border-zinc-600 shadow-sm rounded h-10 px-3 bg-zinc-900 text-white'
        {...register('email')}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div className='flex flex-col gap- 1'>
        <label htmlFor='password'>Password</label>
       <input
        type='password'
        className='border border-zinc-600 shadow-sm rounded h-10 px-3 bg-zinc-900 text-white'
        {...register('password')}
        />
         {errors.password && <span>{errors.password.message}</span>}
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
        <input
        type='text'
        className='flex-1 borderborder-zinc-600 shadow-sm rounded h-10 px-3 bg-zinc-900 text-white'
        {...register(`tech.${index}.title`)}
        />     
        {/* {errors.tech?{index}?.title && <span>{errors}</span>} */}
        <input
        type='number'
        className=' w-16 flex-1 border border-zinc-600 shadow-sm rounded h-10 px-3 bg-zinc-900 text-white'
        {...register(`tech.${index}.knowledge`)}
        />
        </div>
        
      )
    })}
       </div>

    <button 
    type='button'
    className='bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600'
    >
      Salvar
    </button>
    </form>
    <pre>{output}</pre>
   </main>

  )
}


