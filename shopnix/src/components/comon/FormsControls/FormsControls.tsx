import s from './FormsControls.module.css';
import { Form } from 'react-bootstrap';
import React from 'react';

type MetaType = {
  touched: string
  error:string
}

type PropsType = {
  input:string
  meta:MetaType
  props:string[]
}

export const Textarea:React.FC<PropsType> = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={s.formControl + " " + (hasError ? s.error : " ")}>
      <textarea {...input} {...props}/>
      {hasError && <span>{meta.error}</span> }
    </div>
  )
}

export const Input:React.FC<PropsType> = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={s.formControl + " " + (hasError ? s.error : " ")}>
      <Form.Control {...input} {...props}/>
      {hasError && <span>{ meta.error}</span> }
    </div>
  )
}
export const Check:React.FC<PropsType> = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={s.formControl + " " + (hasError ? s.error : " ")}>
      <Form.Check {...input} {...props}/>
      {hasError && <span>{ meta.error}</span> }
    </div>
  )
}