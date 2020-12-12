<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
{
    public function all()
    {
        $users = User::orderBy('name')
            ->with('exams')
            ->where('is_admin', 0)
            ->get()
            ->map->format();

        return $users;
    }

    public function show($id)
    {
        $user = User::find($id)->format();

        return $user;
    }

    // public function format($user)
    // {
    //     return  [
    //         'name' => $user->name,
    //         'email' => $user->email,
    //         'exams' => count($user->exams),
    //         'last_updated' => $user->updated_at->diffForHumans()
    //     ];
    // }
}
