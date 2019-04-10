package com.zemoso.concurrentcallingservermodule.service;

import com.zemoso.concurrentcallingservermodule.model.User;
import com.zemoso.concurrentcallingservermodule.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService
{
    @Autowired
    public UserRepository userRepository;

    public List<User> getAllUsers()
    {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users :: add);
        return users;
    }

    public Optional<User> getUserById(Long id)
    {
        return userRepository.findById(id);
    }
}
