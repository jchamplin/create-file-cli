const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");

/**
 * Creates a file using CLI
 */
class CreateFile {
  constructor() {
    this.init();
  }

  /**
   * Initialize
   */
  async init() {
    // show script intro
    this.showMessage('Create File - cli');
  
    // ask questions
    const { FILENAME, EXTENSION } = await this.questionList();
  
    // create file
    const filePath = this.createFile(FILENAME, EXTENSION);
  
    // show message
    this.showPath(filePath);
  }
  
  /**
   * Show Message
   * @param {msg} string message text
   */
  showMessage(msg) {
    console.log(
      chalk.green(
        figlet.textSync(msg.toUpperCase(), {
          font: 'letters',
          horizontalLayout: 'default',
          verticalLayout: 'default'
        })
      )
    );
  }
      
  /*
   * CLI questions for file name/extension
   */
  questionList() {
    const questions = [
      {
        name: 'FILENAME',
        type: 'input',
        message:  'Filename?'
      },
      {
        name: 'EXTENSION',
        type: 'list',
        message: 'File Extention: ',
        choices: ['.js', '.txt', '.css'],
        filter: val => val.split('.')[1]
      }
    ];

    return inquirer.prompt(questions);
  }

  /**
   * 
   * @param {string} name filename
   * @param {string} extension file extension value
   */
  createFile(name, extension) {
    const filePath = `${process.cwd()}/${name}.${extension}`;
    shell.touch(filePath);
    
    return filePath;
  }
 
  /**
   * Show file path location in CLI
   * @param {string} filePath file location
   */
  showPath(filePath) {
    console.log(
      chalk.white.bgGreen.bold(`path: ${filePath}`)
    )
  }
}

new CreateFile();
