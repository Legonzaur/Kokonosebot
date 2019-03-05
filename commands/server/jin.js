const {Command} = require('discord.js-commando');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
      super(client, {
        name: 'jin',
        group: 'server',
        memberName: 'jin',
        description: 'show and manage all messages who mention @jin or @sidu and saved by KokonoseBot',
        examples: ['jin', 'jin delete 1'],
        argsPromptLimit: 0,
        args: [
          {
            key: 'command',
            prompt: '(None): Show the page 1, `page` : show the page <x>, `delete` : delete the message with the <x> ID (if you have rights).',
            type: 'string',
            default: ""
          },
          {
            key: 'x',
            prompt: 'A page number or a message ID',
            type: 'string',
            default: ""
          }
        ]
      });
    }

    run(msg, {command, x}) {
      //SELECT count(*) FROM 
      
      if (command=="delete"){
        //if have admin permissions or is the message owner
          //delete
        //else prompt error
      } else {
        if (command=="page") {
          //test if page is possible (if page is number and page*10>)
        } else {
          //set showing range [0,10]
        }

      }
    }
};