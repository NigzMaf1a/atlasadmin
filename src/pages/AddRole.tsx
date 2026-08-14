//components
import Page from "../components/Page"
import CustomDiv from "../components/CustomDiv"

//shadcn
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"

export default function AddRole() {
    return (
        <Page>
            <CustomDiv className="w-full h-full mx-2 mt-2">
                <Card className="mt-auto">
                    <CardHeader className="flex items-center justify-center">
                        <CardTitle className="text-blue-600">Add Role</CardTitle>
                    </CardHeader>

                    <CardContent className="flex items-center justify-center">
                        <CardContent className="h-100 w-200">
                            Crazy
                        </CardContent>
                    </CardContent>
                </Card>
            </CustomDiv>
        </Page>
    )
}
