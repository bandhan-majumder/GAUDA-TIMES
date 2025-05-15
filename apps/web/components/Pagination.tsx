import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@repo/ui"

export function PaginationBlog() {
    return (
        <Pagination className="mb-8 text-white">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious size={"lg"} href="#" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink size={"lg"} href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink size={"lg"} href="#" >
                        2
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink size={"lg"} href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext size={"lg"} href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
