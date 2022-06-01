<?php

namespace App\Http\Requests;

use App\Models\Member;
use Illuminate\Validation\Rule;
use App\Http\Requests\BaseRequest;

class MemberRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
/*         $this->setModel(Member::class);
        return $this->isAuthorized(); */
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $this->setModel(Member::class);
        $rules = parent::rules();

        if ($this->isStore()) {
            $rules = array_merge($rules, [
                'firstName' => [
                    'required',
                    'max:150',
                    'regex:/^[A-ZÑÁÉÍÓÚÜ]([a-zA-Z\sñÑáéíóúÁÉÍÓÚüÜ])*$/' // empieza por una mayuscula y solo puede contener letras y espacios
                ],
                'lastName' => [
                    'required',
                    'max:150',
                    'regex:/^[A-ZÑÁÉÍÓÚÜ]([a-zA-Z\sñÑáéíóúÁÉÍÓÚüÜ])*$/' // empieza por una mayuscula y solo puede contener letras y espacios
                ],
                'address' => [
                    'required',
                    'max:150',
                    'regex:/^[A-ZÑÁÉÍÓÚÜ]([a-zA-Z0-9\sñÑáéíóúÁÉÍÓÚüÜ])*$/' // empieza por una mayuscula y solo puede contener letras, espacios y numeros
                ],
                'dni' => [
                    'required',
                    'digits_between:7,11',
                    Rule::unique('members')  
                ]
            ]);
        }


        if ($this->isUpdate()) {
            $rules = array_merge($rules, [
                'firstName' => [
                    'required',
                    'max:150',
                    'regex:/^[A-ZÑÁÉÍÓÚÜ]([a-zA-Z\sñÑáéíóúÁÉÍÓÚüÜ])*$/' // empieza por una mayuscula y solo puede contener letras y espacios
                ],
                'lastName' => [
                    'required',
                    'max:150',
                    'regex:/^[A-ZÑÁÉÍÓÚÜ]([a-zA-Z\sñÑáéíóúÁÉÍÓÚüÜ])*$/' // empieza por una mayuscula y solo puede contener letras y espacios
                ],
                'address' => [
                    'required',
                    'max:150',
                    'regex:/^[A-ZÑÁÉÍÓÚÜ]([a-zA-Z0-9\sñÑáéíóúÁÉÍÓÚüÜ])*$/' // empieza por una mayuscula y solo puede contener letras, espacios y numeros
                ],
                'dni' => [
                    'required',
                    'digits_between:7,11',
                    Rule::unique('members')->ignore($this->member->id)  
                ]
            ]);
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'firstName.required' => 'Debe ingresar un Nombre',
            'firstName.max' => 'El Nombre ingresado es demasiado largo',
            'firstName.regex' => 'El Nombre ingresado debe empezar con una Mayuscula y solo puede contener Letras y Espacios',       
            
            'lastName.required' => 'Debe ingresar un Apellido',
            'lastName.max' => 'El Apellido ingresado es demasiado largo',
            'lastName.regex' => 'El Apellido ingresado debe empezar con una Mayuscula y solo puede contener Letras y Espacios',       

            'address.required' => 'Debe ingresar una Direccion',
            'address.max' => 'La Direccion ingresada es demasiado larga',
            'address.regex' => 'La Direccion ingresada debe empezar con una Mayuscula y solo puede contener Letras, Espacios y Números',       

            'dni.required' => 'Debe ingresar un DNI',
            'dni.digits_between' => 'El DNI debe tener entre 7 y 11 Digitos ',      
            'dni.unique' => 'El DNI ingresado ya existe',
        ];
    }
}
