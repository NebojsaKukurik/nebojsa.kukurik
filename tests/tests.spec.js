
const { test, expect } = require('@playwright/test');
const defaultPassword='s3cret';
const defaultUser='Dina20';
const validFirstname='TestFirstname';
const validLastname='TestLastname';
const validUsername='TestUsername';
const validPassword='TestPassword';

//for in task 5 and task 6
function generateUniqueId() {
  const timestamp = Date.now().toString(36); 
  const randomStr = Math.random().toString(36).substr(2, 5); 
  const uniqueId = timestamp + randomStr; 
  return uniqueId.substr(0, 10); 
}
const id = generateUniqueId();
const firstTranId=generateUniqueId();
const secondTranId=generateUniqueId()
const thirdTranId=generateUniqueId();
const validBankName='valid bank name';

test('task1', async ({ page }) => {

  //navigation throught signin page
  /*
  await page.goto('http://localhost:3000/signup')
  await page.locator('[data-test="signup"]').click();
  await expect(page).toHaveURL('http://localhost:3000/signup')
  */

  await page.goto('http://localhost:3000/signup');

  //empty first name check
  await page.getByLabel('First Name *').fill('');
  await page.getByLabel('Last Name *').fill(validLastname);
  await page.getByLabel('Username *').fill(validUsername);
  await page.locator('[id="password"]').fill(validPassword);
  await page.getByLabel('Confirm Password *').fill(validPassword);
  const signupButton =  page.locator('[data-test="signup-submit"]');
  await expect(signupButton).toBeDisabled();

  //empty last name check
  await page.getByLabel('First Name *').fill(validFirstname);
  await page.getByLabel('Last Name *').fill('');
  await page.getByLabel('Username *').fill(validUsername);
  await page.locator('[id="password"]').fill(validPassword);
  await page.getByLabel('Confirm Password *').fill(validPassword);
  await expect(signupButton).toBeDisabled();

  //empty username check
  await page.getByLabel('First Name *').fill(validFirstname);
  await page.getByLabel('Last Name *').fill(validLastname);
  await page.getByLabel('Username *').fill('');
  await page.locator('[id="password"]').fill(validPassword);
  await page.getByLabel('Confirm Password *').fill(validPassword);
  await expect(signupButton).toBeDisabled();

  //empty password check
  await page.getByLabel('First Name *').fill(validFirstname);
  await page.getByLabel('Last Name *').fill(validLastname);
  await page.getByLabel('Username *').fill(validUsername);
  await page.locator('[id="password"]').fill('');
  await page.getByLabel('Confirm Password *').fill(validPassword);
  await expect(signupButton).toBeDisabled();

  //empty confirm password check
  await page.getByLabel('First Name *').fill(validFirstname);
  await page.getByLabel('Last Name *').fill(validLastname);
  await page.getByLabel('Username *').fill(validUsername);
  await page.locator('[id="password"]').fill(validPassword);
  await page.getByLabel('Confirm Password *').fill('');
  await expect(signupButton).toBeDisabled();

  //empty confirm password check
  await page.getByLabel('First Name *').fill(validFirstname);
  await page.getByLabel('Last Name *').fill(validLastname);
  await page.getByLabel('Username *').fill(validUsername);
  await page.locator('[id="password"]').fill(validPassword);
  await page.getByLabel('Confirm Password *').fill('');
  await expect(signupButton).toBeDisabled();

  //already existing user check. Well this is a bug. User will not be overwritten but error message is missing :) or it its left intentionally like this beacuse so people can pratice user creation
  /*await page.getByLabel('First Name *').fill(validFirstname);
  await page.getByLabel('Last Name *').fill(validLastname);
  await page.getByLabel('Username *').fill(defaultUser);
  await page.locator('[id="password"]').fill(validPassword);
  await page.getByLabel('Confirm Password *').fill(validPassword);*/

  //confirm password is not matching
  await page.getByLabel('First Name *').fill(validFirstname);
  await page.getByLabel('Last Name *').fill(validLastname);
  await page.getByLabel('Username *').fill(validUsername);
  await page.locator('[id="password"]').fill(validPassword);
  await page.getByLabel('Confirm Password *').fill(validFirstname);
  await expect(signupButton).toBeDisabled();

  //password is <4 char
  await page.getByLabel('First Name *').fill(validFirstname);
  await page.getByLabel('Last Name *').fill(validLastname);
  await page.getByLabel('Username *').fill(validUsername);
  await page.locator('[id="password"]').fill('123');
  await page.getByLabel('Confirm Password *').fill(validPassword);
  await expect(signupButton).toBeDisabled();
  const passErrorMessage =  page.locator('[id="password-helper-text"]');
  expect(passErrorMessage).toBeVisible();

  //empty all fields check, deleting previous values from fields 
  await page.getByLabel('First Name *').fill('');
  await page.getByLabel('Last Name *').fill('');
  await page.getByLabel('Username *').fill('');
  await page.locator('[id="password"]').fill('');
  await page.getByLabel('Confirm Password *').fill('');
  await expect(signupButton).toBeDisabled();

  //create new user
  await page.getByLabel('First Name *').fill(validFirstname);
  await page.getByLabel('Last Name *').fill(validLastname);
  await page.getByLabel('Username *').fill(validUsername);
  await page.locator('[id="password"]').fill(validPassword);
  await page.getByLabel('Confirm Password *').fill(validPassword);
  await signupButton.click();
  await expect(page).toHaveURL('http://localhost:3000/signin');

});

test('task2', async ({ page }) => {
   await page.goto('http://localhost:3000/signin');
  
  //empty fields check
  await page.getByLabel('Username').fill('');
  await page.getByLabel('Password').fill('');
  const signinButton =  page.locator('[data-test="signin-submit"]');
  await expect(signinButton).toBeDisabled();

  //empty username check
  await page.getByLabel('Username').fill('');
  await page.getByLabel('Password').fill(defaultPassword);
  await expect(signinButton).toBeDisabled();

  //empty password check
  await page.getByLabel('Username').fill(defaultUser);
  await page.getByLabel('Password').fill('');
  await expect(signinButton).toBeDisabled();

  //incorrect username
  await page.getByLabel('Username').fill('test_name_incorrect');
  await page.getByLabel('Password').fill(defaultPassword);
  await expect(signinButton).toBeEnabled();
  await signinButton.click()
  const errorMessage =  page.locator('[data-test="signin-error"]');
  expect(errorMessage).toBeVisible();

  //incorrect password
  await page.getByLabel('Username').fill(defaultUser);
  await page.getByLabel('Password').fill('test_pass_incorrect');
  await expect(signinButton).toBeEnabled();
  await signinButton.click()
  expect(errorMessage).toBeVisible();
  
  //password is <4 
  await page.getByLabel('Username').fill(defaultUser);
  await page.getByLabel('Password').fill('123');
  await page.getByLabel('Remember me').click(); //click on screen is needed for error message to appear
  const passErrorMessage =  page.locator('[id="password-helper-text"]');
  expect(passErrorMessage).toBeVisible();

  //login with newly created user from task1
  await page.getByLabel('Username').fill(validUsername);
  await page.getByLabel('Password').fill(validPassword);
  await signinButton.click();
  await expect(page).toHaveURL('http://localhost:3000/');

  //validation is this first login, if yes fill random data
  const isFirstLogin=await page.locator('[data-test="user-onboarding-next"]').isVisible();
  if (isFirstLogin)
    { 
  await page.locator('[data-test="user-onboarding-next"]').click();
  await page.getByPlaceholder('Bank Name').fill('Test123');
  await page.getByPlaceholder('Routing Number').fill('123456789');
  await page.getByPlaceholder('Account Number').fill('123456789')
  await page.locator('[data-test="bankaccount-submit"]').click();
  await page.locator('[data-test="user-onboarding-next"]').click();
  }

});

test('task3', async ({ page }) => {
  //when test is started new incognito chorme window will be opened and it is needed to sign in into app
  //i tested and i could grab authState key value from test task2 and set it here in this test but then  
  //create bank account on first succesfull login would pop again so log in into app again is much simpler way
  await page.goto('http://localhost:3000/');
  await page.getByLabel('Username').fill(validUsername);
  await page.getByLabel('Password').fill(validPassword);
  await page.locator('[data-test="signin-submit"]').click();
  //edit blank fields check
  await page.locator('[data-test="sidenav-user-settings"]').click();
  const locatorPhoneNumber= page.locator('[data-test="user-settings-phoneNumber-input"]');
  const locatorEmail= page.locator('[data-test="user-settings-email-input"]');
  const locatorLastName= page.locator('[data-test="user-settings-lastName-input"]');
  const locatorSaveButton= page.locator('[data-test="user-settings-submit"]');
  const testEmail='test@gmail.com';
  const testPhoneNumber='123456';
  const testLastname='testLastName';
  await locatorEmail.fill(testEmail);
  await locatorPhoneNumber.fill(testPhoneNumber);
  await locatorSaveButton.click();

  //we can reload page or go to home page and back to edit user page. I think that real user will do it this way
  //await page.reload();
  await page.locator('[data-test="sidenav-home"]').click();
  await page.locator('[data-test="sidenav-user-settings"]').click();
  await expect(locatorPhoneNumber).toHaveValue(testPhoneNumber);
  await expect(locatorEmail).toHaveValue(testEmail);
  
  //edit existing field check
  await locatorLastName.fill(testLastname);
  await locatorSaveButton.click();
  await page.locator('[data-test="user-settings-submit"]').click();
  await page.locator('[data-test="sidenav-home"]').click();
  await page.locator('[data-test="sidenav-user-settings"]').click();
  await expect(locatorLastName).toHaveValue(testLastname);
  
  //deleting fields,error message check
  await locatorEmail.fill('');
  await locatorPhoneNumber.fill('');
  const errorMessageEmail= page.getByText('Enter an email address');
  const errorMessagePhoneNumbe= page.getByText('Enter a phone number');
  await expect(errorMessageEmail).toBeVisible();
  await expect(errorMessagePhoneNumbe).toBeVisible();
  await expect(locatorSaveButton).toBeDisabled();

});

test('task4', async ({ page }) => {
  //when test is started new incognito chorme window will be opened and it is needed to sign in into app
  //i tested and i could grab authState key value from test task2 and set it here in this test but then  
  //create bank account on first succesfull login would pop again so log in into app again is much simpler way
  await page.goto('http://localhost:3000/');
  await page.getByLabel('Username').fill(validUsername);
  await page.getByLabel('Password').fill(validPassword);
  await page.locator('[data-test="signin-submit"]').click();
  
  await page.locator('[data-test="sidenav-bankaccounts"]').click();
  await page.locator('[data-test="bankaccount-new"]').click();

  //locators for this page. In real project page objects should be implemented by creating.json file and then importing it to test case but this way is faster and easier to debug
  //const validBankName='Valid Bank Name';
  const invalidBankName='invB';
  const validRoutingNumber='1234asdfg';
  const invalidRoutingNumberLessThan='1234';
  const invalidRoutingNumberMoreThan='123412341234';
  const validAccountNumber='valid1234';
  const invalidAccountNumberLessThan='valid';
  const invalidAccountNumberMoreThan='valid12341234';
  const locatorBankName= page.getByPlaceholder('Bank Name');
  const locatorRoutingNumber= page.getByPlaceholder('Routing Number');
  const locatorAccountNumber= page.getByPlaceholder('Account Number');
  const locatorSaveButton= page.locator('[data-test="bankaccount-submit"]');
  const errorMsgBankNameLessThan= page.getByText('Must contain at least 5');
  const errorMsgRoutingInvalid= page.getByText('Must contain a valid routing');
  const errorMsgAccNoInvalidLess= page.getByText('Must contain at least 9 digits');
  const errorMsgAccNoInvalidMore= page.getByText('Must contain no more than 12');

  //Invalid bank name check
  await locatorBankName.fill(invalidBankName);
  await expect(errorMsgBankNameLessThan).toBeVisible();
  await locatorRoutingNumber.fill(validRoutingNumber);
  await locatorAccountNumber.fill(validAccountNumber);

  //invalid routing number less than check
  await locatorBankName.fill(validBankName);
  await locatorRoutingNumber.fill(invalidRoutingNumberLessThan);
  await expect(errorMsgRoutingInvalid).toBeVisible();
  await locatorAccountNumber.fill(validAccountNumber);

  //invalid routing number more than check 
  await locatorBankName.fill(validBankName);
  await locatorRoutingNumber.fill(invalidRoutingNumberMoreThan);
  await expect(errorMsgRoutingInvalid).toBeVisible();
  await locatorAccountNumber.fill(validAccountNumber);

  //invalid account number less than check 
  await locatorBankName.fill(validBankName);
  await locatorRoutingNumber.fill(validRoutingNumber);
  await locatorAccountNumber.fill(invalidAccountNumberLessThan);
  await expect(errorMsgAccNoInvalidLess).toBeVisible();

  //invalid account number more than check
  await locatorBankName.fill(validBankName);
  await locatorRoutingNumber.fill(validRoutingNumber);
  await locatorAccountNumber.fill(invalidAccountNumberMoreThan);
  await expect(errorMsgAccNoInvalidMore).toBeVisible();

  //create valid bank account check
  await locatorBankName.fill(validBankName);
  await locatorRoutingNumber.fill(validRoutingNumber);
  await locatorAccountNumber.fill(validAccountNumber);
  await locatorSaveButton.click();
  await expect(page.getByText(validBankName).first()).toBeVisible();//i used .first() because accounts can have same name so locator will resolve to multiple elements and just one is needed 

});
test('task5', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByLabel('Username').fill(validUsername);
  await page.getByLabel('Password').fill(validPassword);
  await page.locator('[data-test="signin-submit"]').click();
  await page.locator('[data-test="nav-top-new-transaction"]').click();
  await page.locator('[class="MuiAvatar-img"]').first().click();//this will click on first image of user in list
 
  await page.getByPlaceholder('Amount').fill('10');
  await page.getByPlaceholder('Add a note').fill(id);
  await page.locator('[data-test="transaction-create-submit-payment"]').click();
  await page.locator('[data-test="new-transaction-return-to-transactions"]').click();

});
test('task6', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByLabel('Username').fill(validUsername);
  await page.getByLabel('Password').fill(validPassword);
  await page.locator('[data-test="signin-submit"]').click();
  await page.locator('[data-test="sidenav-home"]').click();
  await page.locator('[data-test="nav-personal-tab"]').click();
  await expect(page.getByText(id)).toBeVisible();

});
test('task7', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByLabel('Username').fill(validUsername);
  await page.getByLabel('Password').fill(validPassword);
  await page.locator('[data-test="signin-submit"]').click();
  
  //create 3 transactions
  await page.locator('[data-test="nav-top-new-transaction"]').click();
  await page.locator('[class="MuiAvatar-img"]').first().click();//this will click on first image of user in list
  await page.getByPlaceholder('Amount').fill('20');
  await page.getByPlaceholder('Add a note').fill(firstTranId);
  await page.locator('[data-test="transaction-create-submit-payment"]').click();
  await page.locator('[data-test="new-transaction-return-to-transactions"]').click();

  await page.locator('[data-test="nav-top-new-transaction"]').click();
  await page.locator('[class="MuiAvatar-img"]').first().click();//this will click on first image of user in list
  await page.getByPlaceholder('Amount').fill('500');
  await page.getByPlaceholder('Add a note').fill(secondTranId);
  await page.locator('[data-test="transaction-create-submit-payment"]').click();
  await page.locator('[data-test="new-transaction-return-to-transactions"]').click();

  await page.locator('[data-test="nav-top-new-transaction"]').click();
  await page.locator('[class="MuiAvatar-img"]').first().click();//this will click on first image of user in list
  await page.getByPlaceholder('Amount').fill('900');
  await page.getByPlaceholder('Add a note').fill(thirdTranId);
  await page.locator('[data-test="transaction-create-submit-payment"]').click();
  await page.locator('[data-test="new-transaction-return-to-transactions"]').click();

  await page.locator('[data-test="nav-personal-tab"]').click();
  await page.locator('[data-test="transaction-list-filter-amount-range-button"]').click();
  await page.waitForTimeout(1000);//page will not load correct data so wait is needed
  const sliderHandlerMin=await page.getByRole('slider').first();
  const  boxMin=await sliderHandlerMin.boundingBox();
  await page.mouse.click(boxMin.x+boxMin.width+70,boxMin.y);
  await page.waitForTimeout(1000);//slider will not move if click is performed too fast so wait is needed
  await page.mouse.click(boxMin.x+boxMin.width+150,boxMin.y)
  await page.waitForTimeout(1000);//page will not load correct data so wait is needed
  //validate that filter is working
  expect(page.getByText(firstTranId)).not.toBeVisible();//this will fail for some reason if headless mode is true
  expect(page.getByText(thirdTranId)).not.toBeVisible();
  expect(page.getByText(secondTranId)).toBeVisible();

});

test('task8', async ({ page  }) => {

  await page.goto('http://localhost:3000/');
  await page.getByLabel('Username').fill(validUsername);
  await page.getByLabel('Password').fill(validPassword);
  await page.locator('[data-test="signin-submit"]').click();
  await page.waitForTimeout(2000)

  const axios = require('axios');
  const url = 'http://localhost:3002/graphql';
  const graphqlQuery = `
    query ListBankAccount {
      listBankAccount {
        id
        uuid
        userId
        bankName
        accountNumber
        routingNumber
        isDeleted
        createdAt
        modifiedAt
      }
    }
  `;
  
  const cookies = await page.context().cookies();
  const cookie ='connect.sid='+cookies[0].value;

  axios.post(url, {
    query: graphqlQuery,
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookie,
    },
    withCredentials: true,
  })
  .then((response) => {
    let bankAccounts = response.data.data.listBankAccount;
    const bankName=bankAccounts.map(item=>item.bankName)
    expect(bankName).toContain('valid bank name');

  })
  .catch((error) => {
    console.error('Error:', error);
  });
  
});

