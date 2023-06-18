export default function Pagination({ page, totalPages, onPageChange }) {
    function backwards() {
      if (page > 1) {
        onPageChange(page - 1);
      }
    }
  
    function forward() {
      if (page < totalPages) {
        onPageChange(page + 1);
      }
    }
  
    return (
      <div>
        <button onClick={backwards}>Back</button>
        <p>{page}/{totalPages}</p>
        <button onClick={forward}>Forward</button>
      </div>
    );
  }
  