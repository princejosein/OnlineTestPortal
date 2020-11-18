<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Question extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'question' => $this->question,
            'quiz_id' => $this->quiz_id,
            'quiz_name' => $this->quiz->name,
            'status' => $this->status == 1 ? 'Active' : 'Not Active',
            'options' => $this->options,
            'radioGroup' => $this->getSelectedOption($this->options),
            'created_at' => $this->created_at->diffForHumans(),
            'updated_at' => $this->updated_at->diffForHumans(),
        ];
    }
}
