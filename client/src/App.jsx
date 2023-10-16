import Talk from 'talkjs';
import { useEffect, useState, useRef } from 'react';
import emailjs from 'emailjs-com';


function App() {
  emailjs.init('SUr8z-MuiQP8fGoSl');

  const emailParams = {
    from_name: "HarvestHub",
    to_name: 'Avell Olatunde',
    to_email: 'timothy.avell.olatunde@gmail.com',
    message: 'This is the email message',
  };



  const chatboxEl = useRef();

  // wait for TalkJS to load
  const [talkLoaded, markTalkLoaded] = useState(false);

  useEffect(() => {
    // Use the Talk.ready() promise to ensure TalkJS is loaded
    Talk.ready
      .then(() => {
        markTalkLoaded(true);

        if (talkLoaded) {
          const currentUser = new Talk.User({
            id: '1',
            name: 'Henry Mill',
            email: 'henrymill@example.com',
            photoUrl: 'henry.jpeg',
            welcomeMessage: 'Hello!',
            role: 'default',
          });

          const otherUser = new Talk.User({
            id: '2',
            name: 'Jessica Wells',
            email: 'jessicawells@example.com',
            photoUrl: 'jessica.jpeg',
            welcomeMessage: 'Hello!',
            role: 'default',
          });

          const session = new Talk.Session({
            appId: 'teLsifNQ',
            me: currentUser,
          });

          const conversationId = Talk.oneOnOneId(currentUser, otherUser);
          const conversation = session.getOrCreateConversation(conversationId);
          conversation.setParticipant(currentUser);
          conversation.setParticipant(otherUser);
         
          const chatbox = session.createChatbox();
          chatbox.select(conversation);
          chatbox.mount(chatboxEl.current);
          chatbox.on('sendMessage', (event) => {
            console.log('New message:', event.message);
          });
        }
      })
      .catch((error) => {
        console.error('TalkJS could not load:', error);
      });
  }, [talkLoaded]);

  const handleSubmit = () => {
    emailjs.send('service_8j5w9uo', 'template_6u3tdjn', emailParams)
  .then(function(response) {
    console.log('Email sent successfully:', response);
  })
  .catch(function(error) {
    console.error('Email sending error:', error);
  });
    console.log('sent')
  }

  return (<>
  {/* <div ref={chatboxEl} style={{ height: '900px', width: '700px' }} /> */}
  <button onClick={handleSubmit}>Submit</button>
  </>);
}

export default App;
