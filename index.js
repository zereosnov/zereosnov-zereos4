export default function Home() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>👑 زيريوس الرابع</h1>
      <div id="chat-box" style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "auto", marginBottom: "10px" }}></div>
      <input type="text" id="user-input" placeholder="اكتب رسالتك..." style={{ width: "80%" }} />
      <button onClick={sendMessage}>إرسال</button>

      <script dangerouslySetInnerHTML={{ __html: `
        async function sendMessage() {
          const input = document.getElementById("user-input");
          const chatBox = document.getElementById("chat-box");
          const userText = input.value.trim();
          if (!userText) return;
          chatBox.innerHTML += '<div><b>أنت:</b> ' + userText + '</div>';
          input.value = '';
          chatBox.innerHTML += '<div><i>زيريوس الرابع يفكر...</i></div>';
          chatBox.scrollTop = chatBox.scrollHeight;

          try {
            const response = await fetch('/api/chat', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ message: userText }),
            });
            const data = await response.json();
            const botReply = data.reply || 'لا يوجد رد.';
            chatBox.innerHTML += '<div><b>زيريوس الرابع:</b> ' + botReply + '</div>';
            chatBox.scrollTop = chatBox.scrollHeight;
          } catch {
            chatBox.innerHTML += '<div><b>زيريوس الرابع:</b> حصل خطأ.</div>';
          }
        }
      ` }} />
    </div>
  );
}
