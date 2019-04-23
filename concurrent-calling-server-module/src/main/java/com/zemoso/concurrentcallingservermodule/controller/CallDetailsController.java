package com.zemoso.concurrentcallingservermodule.controller;

import com.zemoso.concurrentcallingservermodule.model.CallDetailsModel;
import com.zemoso.concurrentcallingservermodule.service.CallDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

    @RequestMapping(method = RequestMethod.GET, value = "/call-details/{id}")
    public Optional<CallDetailsModel> getCallDetails(@PathVariable Long id)
    {
        return callDetailsService.getCallDetailsById(id);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/timeline-logs/{phoneNumber}")
    public List<Map<String, Object>> getTimeLineLogs(@PathVariable String phoneNumber)
    {
        try
        {
            return callDetailsService.getTimeLineLogs(phoneNumber);
        }
        catch(Exception e)
        {
        }
        return null;
    }

    @RequestMapping(method= RequestMethod.POST,value="/call-details")
    public void addCallDetails(@RequestBody CallDetailsModel callDetails)
    {
        callDetailsService.addCallDetails(callDetails);
    }


    @RequestMapping(method=RequestMethod.PUT, value="/call-details/status/{id}")
    public void updateStatus(@RequestBody Map<String, Object> map, @PathVariable Long id)
    {
        String status = map.get("status").toString();
        callDetailsService.updateStatus(id, status);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/call-details/notes/{id}")
    public void updateNotes(@RequestBody Map<String, Object> map, @PathVariable Long id)
    {
       // String status = map.get("status").toString();
        String notes = map.get("notes").toString();
        callDetailsService.updateNotes(id, notes);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "call-details/update-connectedtime-duration-duedate/{id}")
    public void updateCreatedTimeDurationDueDate(@RequestBody Map<String, Object> map, @PathVariable Long id)
    {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy, HH:mm:ss");
        System.out.println();
        LocalDateTime createdDate = LocalDateTime.parse(map.get("createdDate").toString(),formatter);
        String duration = map.get("duration").toString();
        String dueDate = map.get("dueDate").toString();

        callDetailsService.updateCreatedTimeDurationDueDate(id, createdDate, duration, dueDate);
    }


    @RequestMapping(method=RequestMethod.DELETE, value="/call-details/{id}")
    public void deleteCallDetailsById(@PathVariable Long id)
    {
        callDetailsService.deleteCallDetailsById(id);
    }
}
