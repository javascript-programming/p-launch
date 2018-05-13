import { Web3Service } from "./Web3Service";

const ws = new Web3Service()
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askParam (param: string): Promise<string> {

  return new Promise((resolve, reject) => {
    rl.question(`Param value for ${param} ? : `, (answer) => {
        resolve(answer)
    });
  })
}

function askAccount (): Promise<string> {
  return new Promise((resolve, reject) => {
    console.log(ws.Accounts)
    rl.question(`What account to send from (default is ${ws.Accounts}) ? : `, (answer) => {
      resolve(answer)
    });
  })
}

function askFunction () {

  rl.question('What function should I call? : ', async (answer) => {

    switch (answer) {
      case 'getAccounts' :
        console.log(ws.Accounts)
        break;
      default:
        if (ws.functionExists(answer)) {
          console.log(`Please provide the arguments for : ${answer}`);

          let inputs = ws.getFunctionInputs(answer),
              input, args = [];

          while(input = inputs.pop()) {
            args.push(await askParam(input.name))
          }

          const isView = ws.functionIsView(answer)

          if (isView) {
            console.log(await ws.call(answer, args))
          } else {

            let account = await askAccount()
            let password = '123'

            console.log('Please wait...')
            console.log(await ws.send(answer, args, account, password))
          }
        } else {
          console.log(`Function ${answer} doesn't exist`);
        }
        break;
    }

    askFunction()

  });
}

askFunction();
