import React from 'react';
import "../css/style.css";

import "../css/font-awesome.min.css";

export default function HomePage () {
return (
    <>

        <div className="service_section layout_padding">
            <div className="service_container">
            <div className="container ">
                <div className="heading_container heading_center">
                <h1 className='font-bold'>
                    JavePlatform
                </h1>
                <h2 className='pt-4'>
                    Todo tu material de estudio en el mismo<span> lugar</span>
                </h2>
                <p className='mx-20 pt-4'>
                    Bienvenido a JavePlatform, el máximo centro en línea para la colaboración académica y el intercambio de recursos. 
                    En JavePlatform, creemos en el poder transformador de compartir conocimientos, nuestra plataforma ha sido diseñada 
                    pensando en el estudiante moderno. Ya seas un estudiante que busca destacar en tu próximo examen o un educador que 
                    se esfuerza por crear una experiencia de aula atractiva, JavePlatfomr es el espacio virtual perfecto para conectarte, 
                    colaborar y sobresalir.
                </p>
                </div>
                <div className="row flex px-10">
                <div className="col-md-4 flex">
                    <div className="box ">
                    <div className="img-box">
                        <img src="images/s1.png" alt=""></img>
                    </div>
                    <div className="detail-box">
                        <h5>
                            Comparte tu Material
                        </h5>
                        <p className='pt-10'>
                            Imagina poder compartir tus recursos educativos y beneficiarte de los conocimientos de otros, 
                            todo en una plataforma integrada y amigable. Con nuestra función de compartir material de estudio en JavePlatform, 
                            estás a solo unos clics de contribuir al aprendizaje colectivo y de acceder a una variedad ilimitada de recursos. 
                        </p>
                    </div>
                    </div>
                </div>
                <div className="col-md-4 ">
                    <div className="box ">
                    <div className="img-box">
                        <img src="images/s2.png" alt=""></img>
                    </div>
                    <div className="detail-box">
                        <h5>
                            Unete a una gran comunidad de estudio
                        </h5>
                        <p className='pt-10'>
                            Únete a una gran comunidad de estudiantes y educadores apasionados en nuestra plataforma JavePlatform, 
                            donde compartir material de estudio es más que solo un acto de generosidad: es una oportunidad para formar 
                            parte de un movimiento global de aprendizaje colaborativo.
                        </p>
                    </div>
                    </div>
                </div>
                <div className="col-md-4 ">
                    <div className="box ">
                    <div className="img-box">
                        <img src="images/s3.png" alt=""></img>
                    </div>
                    <div className="detail-box items-center">
                        <h5>
                            Gana recompensas por tus aportes
                        </h5>
                        <p className='pt-10'>
                            En JavePlatform, el acto de compartir material de estudio va más allá de la generosidad, 
                            te brinda la oportunidad de ser recompensado por tus valiosos aportes, nuestra plataformate 
                            ofrece la posibilidad de ganar puntos por tus contribuciones significativas.
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>


        
        <div className="team_section layout_padding">
            <div className="container-fluid">
            <div className="heading_container heading_center pb-10">
                <h2 className="">
                    Nuestro <span> Equipo</span>
                </h2>
            </div>

            <div className="team_container ">
                <div className="row flex justify-center">
                    <a className="bg-black px-10 mx-10 flex items-center rounded-xl text-white-700 hover:text-red-700">
                        Sebastian Galindo
                    </a>
                    <a className="bg-black px-10 mx-10 flex items-center rounded-xl text-white-700 hover:text-red-700">
                        Sergio Barreto
                    </a>
                    <a className="bg-black px-10 mx-10 flex items-center rounded-xl text-white-700 hover:text-red-700">
                        Santiago Ortiz
                    </a>
                    <a className="bg-black px-10 mx-10 flex items-center rounded-xl text-white-700 hover:text-red-700">
                        Daniel Teran
                    </a>
                </div>
            </div>
            </div>
        </div>
        
  </>
  )
}
