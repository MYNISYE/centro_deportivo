import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

const Inicio = () => {
  return (
    <div class='mb-5 container-sm'>
       <div className="BibliotecaUnicosta">
                <div className="titulo-root ">
                <h3>Centro Deportivo Universitario</h3>
                </div>           
                <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.cuc.edu.co/wp-content/uploads/2022/07/CUC-fachada-calle-58-2-1.jpg"
          alt="First slide"
        />      
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://th.bing.com/th/id/OIP.ZlvZw6Sl8I4JUd0ZvdEZ7gHaE8?rs=1&pid=ImgDetMain"
          alt="Second slide"
        />      
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://s3.amazonaws.com/staticcuc/images/stories/archivos/CUC-2021.jpg"
          alt="Third slide"
        />       
      </Carousel.Item>
    </Carousel>
                <div className="Contenido-root">
                Con el propósito de contribuir al desarrollo educativo regional a nivel superior, se creó el 16 de Noviembre de 1970, la UNIVERSIDAD DE LA COSTA –CUC, entidad sin ánimo de lucro, dedicada a la formación de profesionales en el área de la ciencia, la tecnología, las humanidades, el arte y la filosofía
                <br />
                <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit adipisci doloribus commodi vero similique! Rem itaque, laborum distinctio sapiente, recusandae adipisci, provident laboriosam corrupti iure vitae officia? Doloribus, cupiditate recusandae!
                    Obcaecati, eos? Labore cupiditate quod culpa, deleniti quasi itaque nobis nemo, ut ex impedit facere voluptatem laudantium quam a perspiciatis eius minima doloribus nulla vel iusto ad sunt alias. Nihil?
                    Maxime, et. Quae debitis eius illum, cumque excepturi molestiae possimus delectus aperiam iure consequatur error eaque, hic aliquam voluptate. Adipisci consequatur atque quibusdam tempora id, excepturi optio dolore nostrum quae.
                </div>
            </div>
    </div>
  )
}

export default Inicio
