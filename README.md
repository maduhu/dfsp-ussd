# DFSP-USSD service

## Summary ##

This service is used to simulate the work of the normal USSD menu. It is the first of two main interfaces that the users can interact with in order to operate with the system. The purpose of USSD simulator is to simulate a real USSD interface over HTTP. It can send the requests to USSD server and display the responses from it. It is designed as a featured phone on which the user can click buttons and see numbers or text on the screen. Additionally there is a log console where the user can see the requests and responses that have been exchanged with the server. It also has an text box where the user has to enter the phone or user number that the simulator will work with. In an actual scenario, this information is coming from the GSM network and passed to the USSD server. The USSD simulator has a timer that can be started and stop and can be used to measure how long a use case or set of actions will take.

## Simulator details ##


**Simulator has a screen where the responses from the USSD server are displayed.**

*The response usually is limited to maximum 160 character (including spaces and new lines). If the USSD text is in Unicode or any other 16 bit encoding, the responses from the server are limited to 80 characters*

**Simulator has an input box for the requests send to the USSD server.** 

*Usually a USSD session is started by dialing a short code in with a pattern `*DDDD#`, where D can be any digit from 0 to 9.*

**Input field with the phone or user number of the user currently working with the emulator.** 

*In the real life case this number is coming from the GSM network. In this box the user can enter also text.*

**Timer**

*The user can start and stop it by clicking on it.*

**USSD log - on the rigt of the simulator**

*In this box a log for the requests and responses is displayed.*

**Confirm button - the green button** 

*This button sends the data from the input box to the server.*

**Cancel button - the red button**

*This button terminates the current USSD session.*

**Hash button.**

*Button for switching between numbers and text. To enable the text function you need to click on the button and hold it for 2 seconds.*

## Access

The simulator is accessible without credentials on [http://localhost:8019/ussd](http://localhost:8019/ussd/ "http://localhost:8019/ussd") path where dfsp-ussd service is hosted.

## Use Cases

### 1. Customer on-boarding (only for testing purpose)

The use case is developed for testing purposes. It registers a user with an account and credentials DFSP Identity, DFSP Subscription, DFSP Account and DFSP ledger services. It also sends the user into DFSP directory gateway.

    - 1.1 To register as a new customer, the user must enter their phone number via the USSD menu. The DFSP then checks whether the provided phone is already associated with an existing user, and in case no such user is found, the USSD displays the following screen, where the user must select the Open account command:

    - 1.2 On the first screen the user must enter their user number or allow the system to create one for them automatically.

    - 1.3 On the next screen the user must enter their first name.

    - 1.4 On the next screen the user must enter their last name.

    - 1.5 On the next screen the user must enter their date of birth.

    - 1.6 On the next screen the user must enter their national ID.

    - 1.7 On the next screen the user must provide a PIN.

    - 1.8 On the next screen the user must provide an account name.

    - 1.9 A confirmation screen appears, containing information about the user number.

Next time the use logs in using their phone number, the system recognizes them and displays the standard welcome screen.

### 2. Send money from Person-to-Person

In the Send money user case, a transfer is wired to another user, who can be in different DFSP. When the user number of the receiver is entered, the system display its name. When the amount is entered the system displays the fees that the user which sends the money has to pay. A final confirmation screen is displayed where the user has to enter his PIN.

### 3. Sell Goods

In the Sell Goods use case, a merchant sends an invoice to a buyer who can be in different DFSP. When the user number of the receiver is entered, the system display its name. When the amount is entered the system displays the fees that the user which sends the money has to pay. A final confirmation screen is displayed in which the user has to enter his PIN.

### 4. Pending Transactions

In th Pending Transactions use case, a buyer approves or rejects a pending invoice from a merchant who can be in different DFSP. When the user number of the receiver is entered, the system display its name. A final confirmation screen is displayed where the user has to enter his PIN.

### 5. Manage Accounts

The Manage Account USSD menu command enables users to manage their accounts, namely to add, edit, and close an account. They can also get account information, and add or remove account holders.

#### 5.1 Adding an account ####

To add an account, the user selects the Add account USSD menu, then enters a name for the new account.Then the user is prompted to define whether the new account will be a primary one or not.The user confirms their choice by entering their PIN, and a confirmation message displays. Next time the user uses the USSD menu, they are prompted to select one of their accounts before proceeding any further.

#### 5.2 Editing an account ####

The user can edit an existing account by changing its name, or by setting it as primary.
The user selects one of their existing accounts, then selects the Manage account USSD menu command, after that they select the Edit account USSD menu command.
To edit the name of an account, the user must enter a new name after the prompt.
To make the current account the primary one, the user must enter their PIN to confirm their choice. A confirmation message displays.

#### 5.3 Closing an account ####

The user can close any account that is not currently set to primary and which does not have any funds.
To close an account, the user must select the Manage account USSD menu command, then select the Close account command. The user enters their PIN to confirm, and a message displays.

The user is switched to their primary account.

#### 5.4 Viewing account information ####

The user can view information about their current account. They must select the Manage account USSD menu command, then select the Account info command.

#### 5.5 Add holder ####

The user can add another user as an account holder. They must select the Manage account USSD menu command, then select the Add holder command. The user is prompted to enter the identifier of the new account holder, then they must select whether the new account holder will be signatory or not. Signatory holders are persons who can move money from the account. The user enters their PIN to confirm, and a message is displayed.

#### 5.6 Remove holder ####

The user can remove an account holder they have previously added to their account. Please note that the user cannot remove themselves as account holders.
To remove an account holder, the user must select the Manage account USSD menu command, then select the Remove holder command. The user is prompted to select the account holder they want to remove.
The user enters their PIN to confirm, and a message is displayed.

### 6. Switching accounts

The user can easily switch between their accounts by selecting the Switch account USSD menu command.
Information about the current account and all available accounts for the user is displayed. The user is prompted to select another existing account to switch to.

### 7. Checking Balance

The Check Balance USSD menu command enables users to check their current balance.
The user selects the 'Check balance' menu item, and their current balance displays on the screen after they enter correct PIN number.

### 8. Checking Ministatement

The user can check their ministatement by selecting the Ministatement USSD menu command.
They are prompted to enter their PIN, then the ministatement information displays.
