"use client"
import React from 'react';
import Link from 'next/link'; // Use Next.js Link component
import Head from 'next/head';  // Use Next.js Head component for SEO/meta tags

const GraphAlgorithm = () => {
    return (
        <div className="min-h-screen flex flex-col items-center bg-white text-indigo-600">
            <Head>
                <title>Graph Algorithms Visualizer</title>
            </Head>
            <h1 className="text-4xl font-bold mt-10 mb-10">
                Graph Algorithms Visualizer
            </h1>

            <div className="container mt-10 flex flex-wrap justify-center">
                {/* BFS & DFS Section */}
                <div className="w-full md:w-1/4 mb-6 p-4">
                    <div className="bg-white bg-opacity-20 rounded-md shadow-xl flex flex-col items-center p-6">
                        <h3 className="text-xl font-semibold mb-4">Breadth First and Depth First Search</h3>
                        <img
                            src="https://visualgo.net/img/gif/dfsbfs.gif"
                            alt="BFS and DFS Visualization"
                            className="rounded-md shadow-lg"
                        />
                        <Link
                            href="/questions/2/bfs-dfs"
                            className="block mt-4 px-4 py-2  bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full text-center hover:bg-purple-600"
                        >
                            BFS and DFS
                        </Link>
                    </div>
                </div>

                {/* Dijkstra Section */}
                <div className="w-full md:w-1/4 mb-6 p-4">
                    <div className="bg-white bg-opacity-20 rounded-md shadow-xl flex flex-col items-center p-6">
                        <h3 className="text-xl font-semibold mb-4">Dijkstra's Shortest Path Algorithm</h3>
                        <img
                            src="https://visualgo.net/img/gif/sssp.gif"
                            alt="Dijkstra's Algorithm Visualization"
                            className="rounded-md shadow-lg"
                        />
                        <Link
                            href="/dijkstra"
                            className="block mt-4 px-4 py-2 bg-purple-500 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full text-center hover:bg-purple-600"
                        >
                            Dijkstra's Algorithm
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GraphAlgorithm;