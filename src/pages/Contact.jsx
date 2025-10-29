import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function Contact() {
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm();

  const onSubmit = data => console.log(data);

  return (
    <Container style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-3">Contáctanos</h2>
      {isSubmitSuccessful && <Alert variant="success">¡Mensaje enviado correctamente!</Alert>}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" {...register('name', { required: true })} />
          {errors.name && <small className="text-danger">El nombre es obligatorio.</small>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Correo</Form.Label>
          <Form.Control
            type="email"
            {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/ })}
          />
          {errors.email && <small className="text-danger">Ingresa un correo válido.</small>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control as="textarea" rows={3} {...register('message', { required: true })} />
          {errors.message && <small className="text-danger">El mensaje no puede estar vacío.</small>}
        </Form.Group>

        <Button type="submit" variant="success" className="w-100">Enviar</Button>
      </Form>
    </Container>
  );
}

export default Contact;
