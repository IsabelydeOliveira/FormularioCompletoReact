import './styles/global.css';

import {useForm} from 'react-hook-form'

export function App() {
  const {register} = useForm()

  return (
   <main className='h-screen bg-zinc-50 flex items-center justify-center'>
    <form className='flex flex-col gap-4 w-full max-w-sm'>
      <div className='flex flex-col gap-1'>
        <label htmlFor=''>E-mail</label>     
        <input 
        type='email' 
        name='email'
        className='border border-zinc-200 shadow-sm rounded h-10 px-3'
      
        />
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor=''>E-mail</label>
       <input
        type='password'
        name='password'
        className='border border-zinc-200 shadow-sm rounded h-10 px-3'
        
        />
      </div>

    <button 
    type='submit'
    className='bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600'
    >
      Salvar
    </button>
    </form>
   </main>

  )
}


