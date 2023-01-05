import { Event } from '../handler/events';
import {client} from '../handler/runner'
import discord from 'discord.js'
import { UsersTabe } from '../tables';
import {promisify} from 'util'
import fs from 'fs'
import path from 'path'
import { BotConfigType } from '../types'
const readFile = promisify(fs.readFile)
import { removeFromArray } from '../functions';
export default new Event("messageCreate", async (massge:discord.Message) => {
    const configReder = await readFile(path.join(__dirname, '../config.json'), 'utf-8')
    const config:BotConfigType = JSON.parse(configReder)
    const prefix = config[6].content as string
    if(!massge.content.startsWith(prefix)){
        return
    }

    const command = massge.content.split(prefix)[1]
    if(command == 'say_hi' && config[2].content != null){
        massge.reply(`${config[2].content}\n${config[3].content}` as string)
    }
    if(command == 'lolo'){
        const row = new discord.ActionRowBuilder()
			.addComponents(
				new discord.ButtonBuilder()
					.setCustomId('button2')
					.setLabel('Click me!')
					.setStyle(discord.ButtonStyle.Primary),
			);
        
        if(config[4].content == true){
            row.addComponents(
                new discord.ButtonBuilder()
                    .setCustomId('button3')
                    .setLabel('Click me!')
                    .setStyle(config[5].content as any),
            );
        }
        massge.channel.send({
            content:'a yow',
            components: [row as any] 
        })
    }
    if(command == 'AllUsers'){
        var getUsers
        try{
            getUsers = await UsersTabe.findAll({})
        } catch(err){
            massge.reply('server error')
            return
        }
        if(getUsers.length == 0){
            massge.reply('teher is no users if you insert some users then test is feild')
            return
        }
        const users = getUsers.map(user => user.get())
        massge.reply(`test completed
${JSON.stringify(users)}
`)
    }
})
