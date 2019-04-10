package com.zemoso.concurrentcallingservermodule.controller;

import com.zemoso.concurrentcallingservermodule.model.CallDetailsModel;
import com.zemoso.concurrentcallingservermodule.service.CallDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
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

    /*
    @RequestMapping(method=RequestMethod.PUT, value="/call-details/{id}/{phoneNumber}")
    public void updateStatus(@RequestBody Map<String, Object> map, @PathVariable Long id, @PathVariable String phoneNumber)
    {
        String status = map.get("status").toString();
        callDetailsService.updateStatus(id, status);
    }
*/
    @RequestMapping(method=RequestMethod.PUT, value="/call-details/{id}")
    public void updateStatusAndNotes(@RequestBody Map<String, Object> map, @PathVariable Long id)
    {
        String status = map.get("status").toString();
        String notes = map.get("notes").toString();

        callDetailsService.updateStatusAndNotes(id, status, notes);
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/call-details/{id}")
    public void deleteCallDetailsById(@PathVariable Long id)
    {
        callDetailsService.deleteCallDetailsById(id);
    }
}
