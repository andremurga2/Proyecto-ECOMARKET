import React from 'react';
import { useForm } from 'react-hook-form';
function HookForm() {
 const { register, handleSubmit, errors } = useForm();
 const onSubmit = data => console.log(data);

 return (
 <form onSubmit={handleSubmit(onSubmit)}>
 <input
 name="email"
 ref={register({ required: true, pattern: /^\S+@\S+$/i })}
 />
 {errors.email && <span>Este campo es requerido y debe ser un email válido</span>}
 <input type="submit" />
 </form>
 );
}
export default HookForm;