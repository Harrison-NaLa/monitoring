'use client';
import {Box, Button, Flex, IconButton, Link, TextField} from '@radix-ui/themes';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {AvatarIcon, EyeNoneIcon, EyeOpenIcon} from '@radix-ui/react-icons';
import {Form, Label} from 'radix-ui';
import {textFieldRootPropDefs} from '@radix-ui/themes/components/text-field.props';

const formSchema = z.object({
    username: z.string().email().min(2, {
        message: 'El correo electrónico debe ser valido.',
    }),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters.',
    }),
});

export type loginFormModel = z.infer<typeof formSchema>;

export default function LoginForm({handleSubmit}: {handleSubmit?: (data: loginFormModel) => void}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
        },
        mode: 'onChange'
    });

    const [showPassword, setShowPassword] = useState(false);
    const passwordType = () => showPassword ? 'text' : 'password';
    const iconShowPassword = () => showPassword ? <EyeNoneIcon width="16" height="16" color="gray"/> :
        <EyeOpenIcon width="16" height="16" color="gray"/>;

    const hasFieldError = (control: keyof z.infer<typeof formSchema>): boolean => {
        return Boolean(form.formState.touchedFields[control]) && Boolean(form.formState.errors[control]);
    };

    const getFieldColor = (control: keyof z.infer<typeof formSchema>): 'red' | 'gray' => {
        return hasFieldError(control) ? 'red' : 'gray';
    };

    const onSubmit = (data: loginFormModel) => {
        if (handleSubmit) handleSubmit(data);
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 mt-4">
            <Flex gap="3" direction="column">
                <Controller
                    name="username"
                    control={form.control}
                    render={({field}) => (
                        <>
                            <Label.Root htmlFor="username">
                                Email o nombre de usuario
                            </Label.Root>
                            <TextField.Root placeholder="Ingrese su correo electrónico o nombre de usuario" size="3"
                                            {...field} id="username" color={getFieldColor('username')}>
                                <TextField.Slot side="right">
                                    <AvatarIcon height="16" width="16"/>
                                </TextField.Slot>
                            </TextField.Root>
                        </>

                    )}
                />
                <Controller
                    name="password"
                    control={form.control}
                    render={({field}) => (
                        <>
                            <Label.Root htmlFor="password">
                                Contraseña
                            </Label.Root>
                            <TextField.Root {...field} placeholder="Ingrese su contraseña" type={passwordType()}
                                            size="3" id="password"
                                            color={getFieldColor('password')}>
                                <TextField.Slot side="right">
                                    <IconButton type="button" size="1" variant="ghost"
                                                onClick={() => setShowPassword(!showPassword)}>
                                        {iconShowPassword()}
                                    </IconButton>
                                </TextField.Slot>
                            </TextField.Root>
                        </>

                    )}
                />
                <Button type="submit" size="3" radius="full" color="green" className="rounded-2xl standard_width">
                    Iniciar sesión
                </Button>
                <Link href="#" className="standard_width mb-5" color="gray">¿Has olvidado tu contraseña?</Link>
            </Flex>
        </form>
    );
}