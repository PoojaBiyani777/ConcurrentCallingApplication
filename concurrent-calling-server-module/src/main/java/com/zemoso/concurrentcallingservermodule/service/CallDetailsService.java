package com.zemoso.concurrentcallingservermodule.service;
import com.zemoso.concurrentcallingservermodule.model.CallDetailsModel;
import com.zemoso.concurrentcallingservermodule.model.User;
import com.zemoso.concurrentcallingservermodule.repository.CallDetailsRepository;
import jdk.nashorn.internal.codegen.CompilerConstants;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.logging.Logger;

@Service
public class CallDetailsService
{
    @Autowired
    public CallDetailsRepository callDetailsRepository;
    private CallDetailsModel savedCallDetails;
    
    public List<CallDetailsModel> getAllCallDetails()
    {
        List<CallDetailsModel> callDetails = new ArrayList<>();
        callDetailsRepository.findAll().forEach(callDetails :: add);
        return callDetails;
    }

    public Optional<CallDetailsModel> getCallDetailsById(Long id)
    {
        return callDetailsRepository.findById(id);
    }

    public List<Map<String, Object>> getTimeLineLogs(String phoneNumber)
    {
        List<CallDetailsModel> timelineLogs = new ArrayList<>();
        CallDetailsModel timelineLog = new CallDetailsModel();
        timelineLog.setPhoneNumber(phoneNumber);
        timelineLogs = callDetailsRepository.findAllByPhoneNumber(phoneNumber);

        List<Map<String, Object>> maps = new ArrayList<>();
        for(int i=0; i<timelineLogs.size(); i++)
        {
            Map<String, Object> map = new HashMap<>();
            CallDetailsModel current = timelineLogs.get(i);
            try
            {
                map.put("contactName", current.getContactName());
                map.put("createdDate", current.getCreatedDate());
                map.put("duration", current.getDuration());
                map.put("notes", current.getNotes());
            }
            catch(Exception e)
            {

            }
            maps.add(map);
        }
        return maps;

    }
    public void addCallDetails(CallDetailsModel callDetails)
    {
        callDetailsRepository.save(callDetails);
    }

    public void updateStatus(Long id, String statusChanged)
    {
        Optional<CallDetailsModel> callDetailsModelOptional = callDetailsRepository.findById(id);
        CallDetailsModel callDetails = callDetailsModelOptional.get();
        if(callDetailsModelOptional.isPresent())
        {
            User user = callDetails.getUser();
            int checked = callDetails.isChecked();
            String contactName = callDetails.getContactName();
            String phoneNumber = callDetails.getPhoneNumber();
            String status = callDetails.getStatus();
            String dueDate = callDetails.getDueDate();
            String duration = callDetails.getDuration();
            String notes = callDetails.getNotes();
            LocalDateTime createdDate = callDetails.getCreatedDate();

            callDetails.setStatus(statusChanged);
            callDetailsRepository.save(callDetails);
        }
        else
        {
          //  logger.info("No Call Details with the given id ");
        }
    }

    public void updateNotes(Long id, String notesChanged)
    {
        Optional<CallDetailsModel> callDetailsModelOptional = callDetailsRepository.findById(id);
        CallDetailsModel callDetails = callDetailsModelOptional.get();
        if(callDetailsModelOptional.isPresent())
        {
            User user = callDetails.getUser();
            int checked = callDetails.isChecked();
            String contactName = callDetails.getContactName();
            String phoneNumber = callDetails.getPhoneNumber();
            String status = callDetails.getStatus();
            String dueDate = callDetails.getDueDate();
            String duration = callDetails.getDuration();
            String notes = callDetails.getNotes();
            LocalDateTime createdDate = callDetails.getCreatedDate();

                callDetails.setNotes(notesChanged);
              //  callDetails.setStatus(statusChanged);
            callDetailsRepository.save(callDetails);
        }
        else
        {
            //  logger.info("No Call Details with the given id ");
        }
    }

    public void updateCreatedTimeDurationDueDate(Long id, LocalDateTime createdDate1, String duration1, String dueDate1)
    {
        Optional<CallDetailsModel> callDetailsModelOptional = callDetailsRepository.findById(id);
        CallDetailsModel callDetails = callDetailsModelOptional.get();
        if(callDetailsModelOptional.isPresent())
        {
            User user = callDetails.getUser();
            int checked = callDetails.isChecked();
            String contactName = callDetails.getContactName();
            String phoneNumber = callDetails.getPhoneNumber();
            String status = callDetails.getStatus();
            String dueDate = callDetails.getDueDate();
            String duration = callDetails.getDuration();
            String notes = callDetails.getNotes();
            LocalDateTime createdDate = callDetails.getCreatedDate();

            callDetails.setCreatedDate(createdDate1);
            callDetails.setDuration(duration1);
            callDetails.setDueDate(dueDate1);
            callDetailsRepository.save(callDetails);
        }
        else
        {
            //  logger.info("No Call Details with the given id ");
        }
    }

    public void deleteCallDetailsById(Long id)
    {
        callDetailsRepository.deleteById(id);
    }

}


