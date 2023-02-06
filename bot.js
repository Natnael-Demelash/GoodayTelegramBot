//importing the telegraf package
const { Telegraf } = require("telegraf");

//creating an instanse of bot using the telegraf constructor and included the API token
const bot = new Telegraf("5923084192:AAFohRBPSJfPf1jZ7f8h_aG8_jULCJ3L7q0");

let requestedService = "";
let employerPhone = "";
// let employerLocation = "";
let gigDescription = "";
let detailMessage;


const goodayOn =
    "💁 <b>GoodayOn</b>  - <i>is a gig platform that connects a skilled professionals with individuals and bussiness in need of their services.</i>\n\nጉዳይኦን በቅርብ ርቀት ላይ የሚገኙ አገልግሎት ሰጪ (ባለሙያ) \nሰራተኞች እና አገልግሎት ፈላጊ (ተጠቃሚዎችን) በቀላሉ የሚያገናኝ የሞባይል መተግበሪያ ነው።";

const helpMessage = `
Use this commands to communicate
/start - starts the bot (ለማስጀመር)
/serviceProviderRequest - for requesting service provider (ባለሙያ/ሰራተኛ ለመጠይቅ)
/register - to register as a Service Provider (እንደ ባለሙያ ለመመዝገብ)
/help - for command referense (እገዛ ለማግኘት)
`;

const regsiterInfo = `
ℹ️ If you are a service provider and want to find clients by promoting your work on goodayOn, Please call 9675 to schedule your appointment date for registration:\n
አገልግሎት ሰጪ ከሆኑ እና ሙያዎትን በጉዳይ ላይ በማስተዋወቅ ደንበኞችን ማግኘት የሚፈልጉ ከሆነ በአካል የጉዳይ ቢሮ በመገኘት መመዝገብ ይኖርቦታል። 9675 በመደወል ለምዝገባ የሚመጡበትን ቀን መረጃ ይቀበሉ.
`

// Initiated when the user /start
bot.command("start", async(ctx) => {
    await ctx.reply(
        "Hello" +
        " " +
        ctx.from.first_name +
        " " +
        "👋 Welcome to GoodayOn telegram bot 🤖"
    );
    await ctx.telegram.sendMessage(ctx.chat.id, goodayOn, { parse_mode: "HTML" }, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "GoodayOn Website", url: "https://gooday.io" }],
            ],
        },
    });
    await ctx.reply(helpMessage);
});

//help command refferense
bot.help((ctx) => {
    ctx.reply(helpMessage);
});

//Service provider request
bot.command("serviceProviderRequest", (ctx) => {
    ctx.telegram.sendMessage(
        ctx.chat.id,
        "What type of service provider did you want? \nየሚፈልጉትን የባለሙያ አይነት ይምረጡ", {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "🧑‍🍳HomeChores \n(የቤት ውስጥ ስራ እርዳታ ባለሙያ)",
                        callback_data: "homeChores",
                    }, ],
                    [{
                        text: "🛠️In-home Technicians & maintenance \n(የቴክኒሽያን ጥገና ባለሙያ)",
                        callback_data: "technicianWorkers",
                    }, ],
                    [{
                        text: "👷‍♂️Construction & Finishing \n(ግንባታ ፊንሽንግ እና ጥገና ባለሙያ)",
                        callback_data: "constructionWorkers",
                    }, ],
                    [{
                        text: "🧑‍💼Business Operation \n(ለንግድ ስራ አስፈላጊ ባለሙያ)",
                        callback_data: "businessOperation",
                    }, ],
                ],
            },
        }
    );
});

//for homeMaid SPs...
bot.action("homeChores", (ctx) => {
    ctx.deleteMessage();
    ctx.telegram.sendMessage(
        ctx.chat.id,
        "Home Maid Service Providers \n(የቤት ውስጥ ስራ እርዳታ ባለሙያ)", {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "Cooking Maid (የቤት ምግብ ሰራተኛ)", callback_data: "cooking-maid" },
                        { text: "Cleaning Maid(የጽዳት ባለሙያ)", callback_data: "cleaning-maid" },
                    ],
                    [
                        { text: "Nanny(ሞግዚት)", callback_data: "nanny" },
                        { text: "Catering(የምግብ ዝግጅት ባለሙያ)", callback_data: "catering" },
                    ],
                    [
                        { text: "Chauffer(ሹፌር)", callback_data: "chauffer" },
                        { text: "Tutor(አስጠኚ)", callback_data: "tutor" },
                    ],
                    //Go back menu
                    [{ text: "🔙Go back (ወደዋናው ዝርዝር ይመለሱ)", callback_data: "go_back" }, ]
                ],
            },
        }
    );
});

//for technician SPs...
bot.action("technicianWorkers", (ctx) => {
    ctx.deleteMessage();
    ctx.telegram.sendMessage(
        ctx.chat.id,
        "Technicians & maintenance \n(የቴክኒሽያን ጥገና ባለሙያ)", {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "Satellite Dish Tech (የዲሽ ባለሙያ)", callback_data: "satellite-dish" },
                        { text: "Electrician (ኤሌክትሪክ ሰራተኛ)", callback_data: "electrician" },
                    ],
                    [
                        { text: "Plumber(የቧንቧ ሰራተኛ)", callback_data: "plumber" },
                        { text: "Electronics Repair(የኤሌክትሮኒክስ ጥገና)", callback_data: "electronics-repair" },
                    ],
                    [
                        { text: "Computer tech(የኮምፒውተር ጥገና ባለሙያ)", callback_data: "computer-tech" },
                        {
                            text: "Home Appliance Repair \n(ፍሪጅ፣ምጣድ፣ ልብስ-ማጠቢያ ጥገና)",
                            callback_data: "home-repair",
                        },
                    ],
                    //Go back menu
                    [{ text: "🔙Go back (ወደዋናው ዝርዝር ይመለሱ)", callback_data: "go_back" }, ]
                ],
            },
        }
    );
});

//for construction SPs...
bot.action("constructionWorkers", (ctx) => {
    ctx.deleteMessage();
    ctx.telegram.sendMessage(
        ctx.chat.id,
        "Construction & Finishing \n(ግንባታ ፊንሽንግ እና ጥገና ባለሙያ)", {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "Construction worker(የግንበኛ ባለሙያ)", callback_data: "construction" },
                        { text: "Aluminium worker(የአልሙኒየም ሰራተኛ)", callback_data: "aluminium" },
                    ],
                    [
                        { text: "Gypsum worker(የጂፕሰም ሰራተኛ)", callback_data: "gypsum" },
                        { text: "Painting(የቀለም ቀቢ ባለሙያ)", callback_data: "painting" },
                    ],
                    //Go back menu
                    [{ text: "🔙Go back (ወደዋናው ዝርዝር ይመለሱ)", callback_data: "go_back" }, ]
                ],
            },
        }
    );
});

//for bussiness operation SPs...
bot.action("businessOperation", (ctx) => {
    ctx.deleteMessage();
    ctx.telegram.sendMessage(
        ctx.chat.id,
        "Business Operation \n(ለንግድ ስራ አስፈላጊ ባለሙያ)", {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "Errand runner(ጉዳይ አስፈጻሚ)", callback_data: "errand" },
                        { text: "Salesman(የሽያጭ ሰራተኛ)", callback_data: "salesman" },
                    ],
                    [{ text: "Accountant(የሂሳብ ሰራተኛ)", callback_data: "accountant" }],
                    //Go back menu
                    [{ text: "🔙Go back (ወደዋናው ዝርዝር ይመለሱ)", callback_data: "go_back" }, ]
                ],
            },
        }
    );
});

//Go Back Menu
bot.action('go_back', ctx => {
    ctx.deleteMessage();
    ctx.telegram.sendMessage(
        ctx.chat.id,
        "What type of service provider did you want?\n የሚፈልጉትን የባለሙያ አይነት ይምረጡ ", {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "🧑‍🍳HomeChores \n(የቤት ውስጥ ስራ እርዳታ ባለሙያ)",
                        callback_data: "homeChores",
                    }, ],
                    [{
                        text: "🛠️In-home Technicians & maintenance \n(የቴክኒሽያን ጥገና ባለሙያ)",
                        callback_data: "technicianWorkers",
                    }, ],
                    [{
                        text: "👷‍♂️Construction & Finishing \n(ግንባታ ፊንሽንግ እና ጥገና ባለሙያ)",
                        callback_data: "constructionWorkers",
                    }, ],
                    [{
                        text: "🧑‍💼Business Operation \n(ለንግድ ስራ አስፈላጊ ባለሙያ)",
                        callback_data: "businessOperation",
                    }, ],
                ],
            },
        }
    );
});


//Register as a service provider
bot.command("register", async(ctx) => {
    await ctx.telegram.sendMessage(ctx.chat.id, regsiterInfo, { parse_mode: "HTML" });
    await bot.telegram.sendLocation(ctx.chat.id, '8.98049', '38.75505')
})

//handling employers request
let serviceRequest = ['cooking-maid', 'cleaning-maid', 'nanny', 'catering', 'chauffer', 'tutor', 'satellite-dish', 'electrician', 'plumber', 'electronics-repair', 'computer-tech', 'home-repair', 'construction', 'aluminium', 'gypsum', 'painting', 'errand', 'salesman', 'accountant'];
bot.action(serviceRequest, ctx => {
    requestedService = ctx.match.toUpperCase();
    // console.log(requestedService);

    ctx.reply("ℹ️ Please tell us detailed information regarding the job and the service provider you want.\n\nስለ ስራው እንዲሁም ስለሚፈልጉት የባለሙያ አይነት ግልጽ የሆነ ማብራሪያ ይንገሩን");

    bot.on("text", async(ctx) => {
        gigDescription = ctx.message.text;
        console.log(gigDescription);
        detailMessage = `<b><u>REQUEST DETAIL</u></b> \n\n<i><b>requtsed service</b></i>: 👉 ${requestedService} 
        \n<i><b>job description</b></i>: ${gigDescription} `
        console.log(detailMessage)
        await ctx.telegram.sendMessage(ctx.chat.id, detailMessage, { parse_mode: "HTML" })
        await ctx.reply('Please provide us your /phone number');

    });

});


bot.command('phone', async(ctx) => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, "Please use 'Share my contact' keyboard button below \nto share your contact number", requestPhoneKeyboard, { parse_mode: "HTML" });
    bot.use((ctx) => {
        console.log(ctx.message.contact)
        employerPhone = ctx.message.contact.phone_number;
        console.log(employerPhone)
    })
})


// bot.hears("location", (ctx) => {
//     console.log(ctx.from);
//     const userName = ctx.from.username;
//     bot.telegram.sendMessage(ctx.chat.id, "Please use 'Share my contact'keyboard button below to share your contact number", requestLocationKeyboard);
//     bot.use((ctx) => {
//         // console.log(ctx.message.location);
//         latitude = ctx.message.location.latitude
//         longitude = ctx.message.location.longitude
//         console.log(latitude, longitude);
//     })
// })

//constructor for providing phone number to the bot
const requestPhoneKeyboard = {
    "reply_markup": {
        "one_time_keyboard": true,
        "resize_keyboard": true,
        "keyboard": [
            [{
                text: "Share my contact",
                request_contact: true,
                one_time_keyboard: true
            }]
        ]
    }

};



// constructor for proving location to the bot
// const requestLocationKeyboard = {
//     "reply_markup": {
//         "one_time_keyboard": true,
//         "resize_keyboard": true,
//         "keyboard": [
//             [{
//                 text: "My location",
//                 request_location: true,
//                 one_time_keyboard: true
//             }],
//             ["Cancel"]
//         ]
//     }

// }



bot.launch();