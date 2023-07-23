import PropTypes from 'prop-types';

const Chat = (props) => {
  return (
    <>
          {JSON.parse(props.questions)?.map((question, index) => (
            <div className="message received" key={index}>{question}</div>
          ))}
          
      <div className="message sent">Hello World</div>
    </>
  );
};

Chat.propTypes = {
  questions: PropTypes.string.isRequired
};

export default Chat;
