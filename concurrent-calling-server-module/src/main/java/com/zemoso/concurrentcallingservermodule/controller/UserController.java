package com.zemoso.concurrentcallingservermodule.controller;

import com.zemoso.concurrentcallingservermodule.model.User;
import com.zemoso.concurrentcallingservermodule.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController
{
    @Autowired
    private UserService userService;

    @RequestMapping("/users")
    List<User> getAllUsers()
    {
        return userService.getAllUsers();
    }

    @RequestMapping("/users/{id}")
    Optional<User> getUserById(@PathVariable Long id)
    {
        return userService.getUserById(id);
    }
}
