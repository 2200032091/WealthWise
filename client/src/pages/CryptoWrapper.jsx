const CryptoWrapper = () => {
  const token = localStorage.getItem('token');  
  return (
      <div className="h-screen">
        <iframe
          src={`http://localhost:3000/dashboard?token=${token}`}
          title="Crypto Dashboard"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          
        />
      </div>
    );
  };
  
  export default CryptoWrapper;
  