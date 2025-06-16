"use client"
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

const GraphAlgorithm = () => {
    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-black to-gray-900 text-purple-300">
            <Head>
                <title>Graph Algorithms Visualizer</title>
            </Head>
            <h1 className="text-5xl font-bold mt-10 mb-10 bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
                Graph Algorithms Visualizer
            </h1>

            <div className="container mt-10 flex flex-wrap justify-center gap-8">
                {/* BFS & DFS Section */}
                <div className="w-full md:w-1/4 mb-6">
                    <div className="bg-gradient-to-br from-purple-900/30 to-black backdrop-blur-sm rounded-xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 flex flex-col items-center p-8 border border-purple-500/20">
                        <h3 className="text-2xl font-semibold mb-6 text-purple-200">Breadth First and Depth First Search</h3>
                        <img
                            src="https://visualgo.net/img/gif/dfsbfs.gif"
                            alt="BFS and DFS Visualization"
                            className="rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                        />
                        <Link
                            href="/questions/2/bfs-dfs"
                            className="block mt-6 px-6 py-3 bg-gradient-to-r from-purple-200 to-purple-400 text-gray-800 rounded-full text-center hover:from-purple-200 hover:to-purple-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
                        >
                            Explore BFS and DFS
                        </Link>
                    </div>
                </div>

                {/* Dijkstra Section */}
                <div className="w-full md:w-1/4 mb-6">
                    <div className="bg-gradient-to-br from-purple-900/30 to-black backdrop-blur-sm rounded-xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 flex flex-col items-center p-8 border border-purple-500/20">
                        <h3 className="text-2xl font-semibold mb-6 text-purple-200">Dijkstra's Shortest Path Algorithm</h3>
                        <img
                            src="https://visualgo.net/img/gif/sssp.gif"
                            alt="Dijkstra's Algorithm Visualization"
                            className="rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                        />
                        <Link
                            href="/dijkstra"
                            className="block mt-6 px-6 py-3 bg-gradient-to-r from-purple-200 to-purple-400 text-gray-800 rounded-full text-center hover:from-purple-200 hover:to-purple-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
                        >
                            Explore Dijkstra's Algorithm
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GraphAlgorithm;