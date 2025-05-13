"use client";

import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@repo/ui"

import React from 'react'

function SearchBar() {
    return (
        <div className="mt-10">
            <Command className="max-w-[400px] mx-auto mt-10">
                <CommandInput placeholder="Type a command or search..." className="bg-[#091127] border-none outline-none p-5 rounded-md text-white" />
                {/* <CommandList className="text-white">
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                    <CommandItem>Calendar</CommandItem>
                    <CommandItem>Search Emoji</CommandItem>
                    <CommandItem>Calculator</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                    <CommandItem>Profile</CommandItem>
                    <CommandItem>Billing</CommandItem>
                    <CommandItem>Settings</CommandItem>
                </CommandGroup>
            </CommandList> */}
            </Command>
        </div>
    )
}

export default SearchBar