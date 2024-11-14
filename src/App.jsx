import './App.css';

import Header from './components/common/header/Header.jsx';
import Footer from './components/common/footer/footer.jsx';
import ViewsController from './components/common/viewsController/ViewsController.jsx';

import Tos from './components/views/tos/tos.jsx';
import ContactForm from './components/views/contactForm/index.jsx';

export default function App () {

  // const books = [
  //   {title: 'Book Title 1', author: 'Author', description: 'Description'},
  //   {title: 'Book Title 2', author: 'Author', description: 'Description'},
  //   {title: 'Book Title 3', author: 'Author', description: 'Description'},
  //   {title: 'Book Title 4', author: 'Author', description: 'Description'},
  //   {title: 'Book Title 5', author: 'Author', description: 'Description'},
  //   {title: 'Book Title 6', author: 'Author', description: 'Description'},
  // ];

  return (
    <div className="app">
      <Header />
      <ViewsController />
      <Footer />
      <Tos />
      {/* <ContactForm /> */}
    </div>
  )
};
