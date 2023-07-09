<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            //
            'title' => ['required','max:200'],
            'author' => ['required','max:100'],
            'tahun' =>['numeric'],
            'categories'=> 'required',
            'penerbit' => ['max:50'],
            'cover'=>['image','required'],
            'file'=>['mimes:pdf','required']
        ];
    }
}
