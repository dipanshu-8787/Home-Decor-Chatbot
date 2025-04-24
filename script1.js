const GEMINI_API_KEY = "AIzaSyCjAKV6t8RYF_aq0CzttYVbmc4Qt7pSinM";
document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector("#user-input");
    const sendBtn = document.querySelector("#send-btn");
    const chatContainer = document.querySelector("#chat-container");

    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    sendBtn.addEventListener("click", () => {
        const message = input.value.trim();
        if (message !== "") {
            addUserMessage(message);
            input.value = "";
            showTyping();
            getGeminiResponse(message);
        }
    });

    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendBtn.click();
    });

    function addUserMessage(message) {
        const userBox = document.createElement("div");
        userBox.className = "user-chat-box";
        userBox.innerHTML = `
            <div class="avatar">👤</div>
            <div class="chat-content">
                <div class="user-chat-content">${message}</div>
                <div class="chat-meta">You • ${new Date().toLocaleTimeString()}</div>
            </div>
        `;
        chatContainer.appendChild(userBox);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function addAiMessage(message) {
        removeTyping();

        const aiBox = document.createElement("div");
        aiBox.className = "ai-chat-box";

        const lines = message.split(/\n|•|- /).filter(line => line.trim() !== "");
        const chatContentDiv = document.createElement("div");
        chatContentDiv.className = "ai-chat-content";

        if (lines.length > 1) {
            const ul = document.createElement("ul");
            ul.style.paddingLeft = "20px";
            lines.forEach(line => {
                const li = document.createElement("li");
                li.textContent = line.trim();
                ul.appendChild(li);
            });
            chatContentDiv.appendChild(ul);
        } else {
            chatContentDiv.textContent = message;
        }

        aiBox.innerHTML = `
            <div class="avatar">🪴</div>
            <div class="chat-content"></div>
            <div class="chat-meta">HomeBot • ${new Date().toLocaleTimeString()}</div>
        `;

        aiBox.querySelector(".chat-content").prepend(chatContentDiv);
        chatContainer.appendChild(aiBox);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function showTyping() {
        const typingBox = document.createElement("div");
        typingBox.id = "typing-indicator";
        typingBox.className = "ai-chat-box";
        typingBox.innerHTML = `
            <div class="avatar">🪴</div>
            <div class="chat-content">
                <div class="ai-chat-content">HomeBot is thinking...</div>
            </div>
        `;
        chatContainer.appendChild(typingBox);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function removeTyping() {
        const typing = document.querySelector("#typing-indicator");
        if (typing) typing.remove();
    }

    async function getGeminiResponse(userMessage) {
        const prompt = `
You are HomeBot, an expert in home decoration, interior design, furniture placement, color schemes, lighting, and maximizing small spaces.

Your job is to respond only to queries related to home decor and interior design.

Be friendly, helpful, and respond with short, clear, and precise tips.

Important:
• Keep answers brief and to the point (3 to 5 bullet points).
• Do not repeat or over-explain.
• Use bullet points like:
   • First tip
   • Second tip
   • Third tip

If the user's question is not about home decor, reply:  
"Sorry, I can only help with home decoration topics. 😊"

User question: "${userMessage}"

Your response:
`;

        try {
            const response = await fetch(GEMINI_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            const data = await response.json();
            const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (aiText && aiText.trim().length > 0) {
                addAiMessage(aiText.trim());
            } else {
                addAiMessage("Sorry, I didn’t catch that. Could you try asking your home decor question differently? 😊");
            }
        } catch (error) {
            console.error("Error:", error);
            addAiMessage("Oops! Something went wrong while contacting HomeBot. Please try again.");
        }
    }
});


















//     const GEMINI_API_KEY = "AIzaSyBrsARPRQvujcEl9wC6fbVpMAy9V1Okjrc";
// document.addEventListener("DOMContentLoaded", () => {
//     const input = document.querySelector("#user-input");
//     const sendBtn = document.querySelector("#send-btn");
//     const chatContainer = document.querySelector("#chat-container");


//     const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

//     sendBtn.addEventListener("click", () => {
//         const message = input.value.trim();
//         if (message !== "") {
//             addUserMessage(message);
//             input.value = "";
//             showTyping();
//             getGeminiResponse(message);
//         }
//     });

//     input.addEventListener("keypress", (e) => {
//         if (e.key === "Enter") {
//             sendBtn.click();
//         }
//     });

//     function addUserMessage(message) {
//         const userBox = document.createElement("div");
//         userBox.className = "user-chat-box";
//         userBox.innerHTML = `
//             <div class="avatar">👤</div>
//             <div class="chat-content">
//                 <div class="user-chat-content">${message}</div>
//                 <div class="chat-meta">You • ${new Date().toLocaleTimeString()}</div>
//             </div>
//         `;
//         chatContainer.appendChild(userBox);
//         chatContainer.scrollTop = chatContainer.scrollHeight;
//     }

//     // function addAiMessage(message) {
//     //     removeTyping();
//     //     const aiBox = document.createElement("div");
//     //     aiBox.className = "ai-chat-box";
//     //     aiBox.innerHTML = `
//     //         <div class="avatar">🪴</div>
//     //         <div class="chat-content">
//     //             <div class="ai-chat-content">${message}</div>
//     //             <div class="chat-meta">HomeBot • ${new Date().toLocaleTimeString()}</div>
//     //         </div>
//     //     `;
//     //     chatContainer.appendChild(aiBox);
//     //     chatContainer.scrollTop = chatContainer.scrollHeight;
//     // }
//     function addAiMessage(message) {
//         removeTyping();
//         const aiBox = document.createElement("div");
//         aiBox.className = "ai-chat-box";
    
//         // Convert message to bullet list if it contains bullet-like structure
//         const lines = message.split(/\n|•|- /).filter(line => line.trim() !== "");
//         const chatContentDiv = document.createElement("div");
//         chatContentDiv.className = "ai-chat-content";
    
//         // Check if it's a bullet-like response
//         if (lines.length > 1) {
//             const ul = document.createElement("ul");
//             ul.style.paddingLeft = "20px"; // Indent bullets a bit
//             lines.forEach(line => {
//                 const li = document.createElement("li");
//                 li.textContent = line.trim();
//                 ul.appendChild(li);
//             });
//             chatContentDiv.appendChild(ul);
//         } else {
//             // Just one-line message, print normally
//             chatContentDiv.textContent = message;
//         }
    
//         aiBox.innerHTML = `
//             <div class="avatar">🪴</div>
//             <div class="chat-content"></div>
//             <div class="chat-meta">HomeBot • ${new Date().toLocaleTimeString()}</div>
//         `;
    
//         // Insert the chat content (with bullet points) inside the chat-content div
//         aiBox.querySelector(".chat-content").prepend(chatContentDiv);
//         chatContainer.appendChild(aiBox);
//         chatContainer.scrollTop = chatContainer.scrollHeight;
//     }
    

//     function showTyping() {
//         const typingBox = document.createElement("div");
//         typingBox.id = "typing-indicator";
//         typingBox.className = "ai-chat-box";
//         typingBox.innerHTML = `
//             <div class="avatar">🪴</div>
//             <div class="chat-content">
//                 <div class="ai-chat-content">HomeBot is thinking...</div>
//             </div>
//         `;
//         chatContainer.appendChild(typingBox);
//         chatContainer.scrollTop = chatContainer.scrollHeight;
//     }

//     function removeTyping() {
//         const typing = document.querySelector("#typing-indicator");
//         if (typing) typing.remove();
//     }
 
//     async function getGeminiResponse(userMessage) {
//         const prompt = `
//     You are HomeBot, an expert in home decoration, interior design, furniture placement, color schemes, lighting, and maximizing small spaces.
    
//     Your job is to respond only to queries related to home decor and interior design.
    
//     Be friendly, helpful, and respond with short, clear, and precise tips.
    
//     Important:
//     • Keep answers brief and to the point (3 to 5 bullet points).
//     • Do not repeat or over-explain.
//     • Use bullet points like:
//        • First tip
//        • Second tip
//        • Third tip
    
//     If the user's question is not about home decor, reply:  
//     "Sorry, I can only help with home decoration topics. 😊"
    
//     User question: "${userMessage}"
    
//     Your response:
//     `;
    

//     try {
//         const response = await fetch(GEMINI_API_URL, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 contents: [{ parts: [{ text: prompt }] }]
//             })
//         });

//         const data = await response.json();
//         const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

//         if (aiText && aiText.trim().length > 0) {
//             addAiMessage(aiText.trim());
//         } else {
//             addAiMessage("Sorry, I didn’t catch that. Could you try asking your home decor question differently? 😊");
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         addAiMessage("Oops! Something went wrong while contacting HomeBot. Please try again.");
//     }
// }
// });
