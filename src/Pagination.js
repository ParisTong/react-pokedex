import { Button } from 'react-bootstrap';

export default function Pagination({ gotoNextPage, gotoPrevPage }) {
  return (
    <div>
      {gotoPrevPage && <Button variant="danger" onClick={gotoPrevPage}>Previous</Button>}
      {gotoNextPage && <Button className="next-button" variant="danger" onClick={gotoNextPage}>Next</Button>}
    </div>
  )
}