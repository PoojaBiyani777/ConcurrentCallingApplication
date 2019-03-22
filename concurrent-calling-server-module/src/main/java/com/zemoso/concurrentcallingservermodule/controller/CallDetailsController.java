package com.zemoso.concurrentcallingservermodule.controller;

import com.zemoso.concurrentcallingservermodule.model.CallDetailsModel;
import com.zemoso.concurrentcallingservermodule.service.CallDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
public class CallDetailsController
{
    @Autowired
    private CallDetailsService callDetailsService;

    @RequestMapping("/call-details")
    public List<CallDetailsModel> getAllCallDetails()
    {
        return callDetailsService.getAllCallDetails();
    }

    @RequestMapping("/call-details/{id}")
    public Optional<CallDetailsModel> getCallDetails(@PathVariable Long id)
    {
        return callDetailsService.getCallDetailsById(id);
    }

    @RequestMapping(method= RequestMethod.POST,value="/call-details")
    public void addCallDetails(@RequestBody CallDetailsModel callDetails)
    {
        callDetailsService.addCallDetails(callDetails);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/call-details/{id}")
    public void updateCallDetails(@RequestBody CallDetailsModel callDetails, @PathVariable Long id)
    {
        callDetailsService.updateCallDetailsById(id, callDetails);
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/call-details/{id}")
    public void deleteCallDetailsById(@PathVariable Long id)
    {
        callDetailsService.deleteCallDetailsById(id);
    }
}
