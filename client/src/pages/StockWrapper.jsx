const StockWrapper = () => {
  const token = localStorage.getItem('token');    
  return (
      <div className="h-screen">
        <iframe
          src={`http://localhost:5173?token=${token}`}
          title="Crypto Dashboard"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
        />
      </div>
    );
  };
  
  export default StockWrapper;
  