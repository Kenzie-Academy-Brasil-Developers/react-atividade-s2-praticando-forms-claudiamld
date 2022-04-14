import './styles.css'
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';

const Form = ({users, setUsers}) => {

    const history = useHistory()

    const formSchema = yup.object().shape({
        username: yup
            .string()
            .required("Campo obrigatório!")
            .min(5, "O campo deve ter no mínimo 5 caracteres"),
        name: yup
            .string()
            .required("Campo obrigatório!")
            .max(18, "O campo deve ter no máximo 18 caracteres"),
        email: yup
            .string()
            .required("Campo obrigatório!")
            .email("Email inválido"),
        confirmEmail: yup
            .string()
            .required("Campo obrigatório!")
            .email("Email inválido!")
            .oneOf([yup.ref("email")], "Emails não correspondentes!"),
        password: yup.string()
            .required("Campo obrigatório!")
            .min(8, "A senha deve conter no mínimo 8 caracteres")
            .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 
            "A senha deve conter pelo menos uma letra maiúscula, um número e um caracter especial!"),
        confirmPassword: yup
            .string()
            .required("Campo obrigatório!")
            .oneOf([yup.ref("password")], "Senhas não correspondentes!"),
        terms: yup
            .boolean()
            .isTrue("Você deve aceitar os termos de uso!")
    })

    const {register, handleSubmit, formState: {errors},} = useForm({resolver: yupResolver(formSchema)})

    const onRegister = (data) => {
        setUsers([...users, data]);
        history.push('/usercard')
    }

    return(
        <form className='form' onSubmit={handleSubmit(onRegister)}>
            <input 
                type="text" 
                placeholder='Nome de usuário *' 
                {...register("username")} 
            />
            {errors.username && <span>{errors.username.message}</span>}
            <input 
                type="text" 
                placeholder='Nome completo *' 
                {...register("name")} 
            />
            <span>{errors.name?.message}</span>
            <input 
                type="text" 
                placeholder='Endereço de email *' 
                {...register("email")} 
            />
            <span>{errors.email?.message}</span>
            <input 
                type="text" 
                placeholder='Confirme seu email *' 
                {...register("confirmEmail")} 
            />
            <span>{errors.confirmEmail?.message}</span>
            <div className='div-password'>
                <div className='password-left'>
                    <input 
                        type="password" 
                        placeholder='Senha *' 
                        {...register("password")} 
                    />
                    <span>{errors.password?.message}</span>
                </div>
                <div className='password-right'>
                    <input 
                        type="password" 
                        placeholder='Confirme sua senha *' 
                        {...register("confirmPassword")} 
                    />
                    <span>{errors.confirmPassword?.message}</span>
                </div>
            </div>
            <div className='div-checkbox'>
                <input 
                    type="checkbox" 
                    {...register("terms")} 
                />
                <span className='span-checkbox'>Eu aceito os termos de uso da aplicação</span>
            </div>
            <span>{errors.terms?.message}</span>
            <button type='submit'  >CADASTRAR</button>
            <p>Já possui uma conta?</p>
        </form>
    )
}
export default Form

