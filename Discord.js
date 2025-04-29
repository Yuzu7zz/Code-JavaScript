require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    const args = message.content.trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === '!hello') {
        message.channel.send('สวัสดีครับ!');
    }

    if (command === '!add') {
        if (args.length < 2) {
            return message.channel.send('กรุณาใส่ตัวเลข 2 ตัว เช่น !add 3 5');
        }
        const num1 = parseFloat(args[0]);
        const num2 = parseFloat(args[1]);
        const result = num1 + num2;
        message.channel.send(`ผลรวม: ${result}`);
    }

    if (command === '!userinfo') {
        message.channel.send(`ชื่อ: ${message.author.username}\nID: ${message.author.id}`);
    }

    if (command === '!help') {
        message.channel.send(
            "**คำสั่งที่ใช้ได้:**\n" +
            "`!hello` - ทักทายบอท\n" +
            "`!add <num1> <num2>` - บวกเลข\n" +
            "`!userinfo` - ข้อมูลผู้ใช้\n" +
            "`!help` - รายการคำสั่ง"
        );
    }
});

client.login(process.env.DISCORD_TOKEN);
