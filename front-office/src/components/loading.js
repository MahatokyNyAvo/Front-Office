import myGif from './jif/wait.gif';

const Loading = () => {
  return (
    <div>
      <center><img src={myGif} alt="my-gif" /></center>
    </div>
  );
};

export default Loading;