import { z } from "zod";

const createUserFormData = z.object({
    name: z.string().min(1,{message: 'Campo nome é obrigatório!'})
    .transform(name => {
      return name.trim().split(' ').map(word=>{
        return word[0].toLocaleUpperCase().concat(word.substring(1))
      }).join(' ')
    }),
    email: z.string()
    .min(1, 'E-mail é obrigatório!' ).email('formato de e-mail invalida!'),
    
    password: z.string()
    .min(6,'Senha precisa ter no mínimo 6 caracteres'),
  
    tech: z.array(z.object({
      title: z.string().min(1,{message: 'O título é abrigatório!'}) ,
      knowledge: z.coerce.number().min(1).max(100),
    })).min(2, 'No mínimo 2 tecnologia!')
})

export { createUserFormData };
export type FormSchema = z.infer<typeof createUserFormData>;