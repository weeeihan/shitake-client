interface props {
  winner: string;
}

const Winner = ({ winner }: props) => {
  return <div>Winner is {winner} </div>;
};

export default Winner;
