import React from "react";
import Slider from "../components/Slider";
import VideoBic from "../components/videobic";
import video from "../assets/video.mp4";

const Dashboard = () => {
  return (
    <div className="w-full h-full flex flex-col  gap-1  bg-gray-100 rounded-xl">
      
      <div className="w-full flex items-center justify-center bg-gray-100 rounded-xl p-1">
        <video
          autoPlay
          muted
          loop
          className="rounded-xl"
          >
          <source src={video} />
          Your browser does not support the video tag.
          <a href={video} download className="text-blue-500 underline">
            Download the video
          </a>
        </video>
      </div>
      <div className="w-full h-full flex flex-col gap-4 items-start justify-between bg-gray-200 rounded-xl p-5">
        <p className="text-2xl font-black text-yellow-500">
          Aujourd'hui, nous apportons simplicité et joie dans la vie de tous les
          jours.
        </p>

        <div className="space-y-4 text-lg text-gray-700 leading-8 font-serif text-justify">
          <p>
            En plus de 80 ans,{" "}
            <span className="font-semibold text-black">BIC</span> est passé de
            débuts modestes à la marque emblématique qu’elle est aujourd'hui.
            Animé par la passion d'apporter simplicité et joie aux gens du monde
            entier, nous continuons à réinventer les objets essentiels du
            quotidien, en concevant des produits qui font partie intégrante de
            nos vies.
          </p>

          <p>
            BIC a commencé simplement — avec une vision et un stylo. L'objectif
            était de créer un produit qui répondrait au besoin fondamental des
            consommateurs de disposer d'un outil d'écriture souple et sans
            effort.
          </p>

          <p>
            Mais le résultat a été bien plus que cela : l'innovation de BIC a
            rendu l'art de l'écriture accessible à tous, donnant à chacun le
            pouvoir d'exprimer sa créativité.
          </p>

          <p>
            Aujourd'hui, nous sommes toujours aussi passionnés d’apporter la
            simplicité et la joie de vivre au quotidien. Notre ambition est de
            réinventer les produits essentiels de tous les jours, en concevant
            des produits qui vivent dans les cœurs et les foyers de millions de
            personnes à travers le monde.
          </p>

          <p>
            Nous pensons avoir un impact positif sur le monde en proposant des
            solutions durables qui respectent la planète grâce à un design
            intelligent et à la création de produits qui durent.
          </p>
        </div>
      </div>
      <div className="w-full h-full flex  items-center justify-center bg-gray-200 rounded-xl">
        <Slider />
      </div>
    </div>
  );
};

export default Dashboard;
