package com.zemoso.concurrentcallingservermodule.controller;

import com.zemoso.concurrentcallingservermodule.model.User;
import com.zemoso.concurrentcallingservermodule.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Blob;
import java.util.List;
import java.util.Map;
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

    @PostMapping("/users")
    void addUser(@RequestBody User user)
    {
        userService.addUser(user);
    }

    @PutMapping("users/update-user-details/{id}")
    public void updateUserDetails(@RequestBody Map<String, Object> map, @PathVariable Long id)
    {
        String userName = map.get("userName").toString();
        String firstName = map.get("firstName").toString();
        String lastName = map.get("lastName").toString();
        String password = map.get("password").toString();
       // Blob displayPicture = map.get("displayPicture").toString();
        userService.updateUserDetails(id, userName, firstName, lastName, password);
    }
}
